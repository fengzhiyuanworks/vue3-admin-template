import axios from "axios";
import Vue from "vue";
import qs from "querystring";
import router from "@/router";
import store from "@/store";
import { SUCCESS, REQUEST_FAIL, URL_NULL, NO_AUTH } from "@/common/constant/retCode";
import { BASE_URL, PORTAL_URL } from "@/common/constant/basePath";
import { delCookie } from "@/common/utils/util";

/** * @param timeout 请求超时时限
 * * @param baseURL 请求根地址
 * * @param interceptors.request 请求拦截
 * * @param interceptors.response
 * 响应拦截
 * */
/* eslint-disable */
let getCookie = function (name) {
  let arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2])
  } else {
    return null
  }
}
let init = false
class ApiClient {
  init () {
    if (init) {
      this.abortAll()
    }
    const { CancelToken } = axios
    this.source = CancelToken.source()
    const baseConfig = {
      timeout: 120000,
      cancelToken: this.source.token,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      withCredentials: true
    }
    this.$http = axios.create(baseConfig)
    this.responseInterceptor = ApiClient.setResponseInterceptor(this.$http)
    // 请求拦截
    this.$http.interceptors.request.use(
      config => {
        if (config.method === 'get') {
          // get传参序列化
          config.data = qs.stringify(config.data)
        }

        if (Vue.ls.get('token')) {
          config.headers['HRX-WEB-SESSION'] = Vue.ls.get('token')
          config.headers['PASESSION'] = Vue.ls.get('token')
          config.headers['MENU'] = Vue.ls.get('menu')
          config.headers['MENU-ID'] = Vue.ls.get('MENU_ID')
        }
        return config
      },
      error => {
        // 增加错误消息提示
        return Promise.reject(error)
      }
    )
    init = true
  }

  request ({
    url,
    data = {},
    type = 'post',
    showError = true,
    showLoading = true,
    specialCode = '',
    returnAll = false
  }, axiosCfg) {
    if (showLoading) {
      store.commit('setVars', {
        isLoading: true
      })
    }
    return new Promise((resolve, reject) => {
      if (!url) {
        reject({
          retCode: URL_NULL,
          retMsg: '请求地址未定义'
        })
        if (showLoading) {
          store.commit('setVars', {
            isLoading: false
          })
        }
        if (showError) {
          Vue.prototype.$message.error('地址未定义')
        }
        return
      }
      // 中台或可视化的接口
      if (url.indexOf('portal') > -1 || url.indexOf('visual-service') > -1) {
        url = PORTAL_URL + url
      } else {
        url = BASE_URL + url
      }

      if (type === 'get') {
        data = {
          params: data
        }
        data.params
          ? (data.params.nowtime = new Date().getTime())
          : (data = {
            params: {
              nowtime: new Date().getTime()
            }
          })
      }
      this.$http[type](url, data, axiosCfg).then(
        response => {
          const { responseCode, responseMsg } = response
          if (showLoading) {
            store.commit('setVars', {
              isLoading: false
            })
          }
          // 可视化的状态码和绩效的 字段名和值都不一样
          if (responseCode === SUCCESS || response.code === specialCode) {
            if (returnAll) {
              resolve(response)
            } else {
              resolve(response.data)
            }
            return
          }
          // 其他的错误拦截提示,下面暂时这么定义，后面根据情况修改
          if (responseCode !== SUCCESS) {
            reject(response)
            if (responseCode === NO_AUTH) {
              Vue.ls.remove('token')
              delCookie('PA_USERINFO')
              router.push('/login')
            }
            if (showError && responseCode !== specialCode) {
              Vue.prototype.$message.error(responseMsg)
            }
          }
        },
        error => {
          if (axios.isCancel(error)) {
            return
          }
          store.commit('setVars', {
            isLoading: false
          })
          if (error.code === "ECONNABORTED" && error.message.indexOf('timeout') > -1) {
            reject({
              retCode: REQUEST_FAIL,
              retMsg: '网络超时'
            })
            if (showError) {
              Vue.prototype.$message.error('网络超时')
            }
            return
          }
          reject({
            retCode: REQUEST_FAIL,
            retMsg: '网络异常'
          })
          if (showError) {
            Vue.prototype.$message.error('网络异常')
          }
        }
      )
    })
  }
  /**
   * 取消所有请求
   * */

  abortAll () {
    this.source.cancel('Abort all')
    init = false
  }

  /** * response interceptors *
@param {axiosInstance} $http - axios instance * @return {interceptorInstance} */
  static setResponseInterceptor ($http) {
    return $http.interceptors.response.use(response => response.data)
  }
}
export default new ApiClient()
