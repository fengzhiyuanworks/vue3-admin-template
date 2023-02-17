/**
 * components util
 */

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}
// 去左右空格;
export function trimParms (params) {
  if (typeof params === 'string') {
    let s = params
    return s.replace(/(^\s*)|(\s*$)/g, '')
  }
  for (let i in params) {
    let s = params[i]
    if (typeof s === 'string') {
      params[i] = s.replace(/(^\s*)|(\s*$)/g, '')
    }
  }
  return params
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*}  jhjhhhhhhhhhhh
 */
export const cutStrByFullLength = (str = '', maxLength = 0) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 * 根据数字返回对应中文汉字
 */
export function SectionToChinese (section) {
  let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let chnUnitChar = ['', '十', '百', '千']
  let strIns = ''
  let chnStr = ''
  let unitPos = 0
  let zero = true
  let v
  if (section > 9 && section < 20) {
    v = section % 10
    chnStr = '十' + chnNumChar[v]
    if (v === 0) {
      chnStr = '十'
    }
  } else {
    while (section > 0) {
      v = section % 10
      if (v === 0) {
        if (!zero) {
          // eslint-disable-next-line no-mixed-spaces-and-tabs
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
  }
  return chnStr
}
/**
 * 深拷贝数据
 */
export function deepClone (item) {
  if (item) {
    const target = item.constructor === Array ? [] : {} // 判断复制的目标是数组还是对象
    for (let keys in item) {
      // 遍历目标
      if (item.hasOwnProperty(keys)) {
        if (item[keys] && typeof item[keys] === 'object') {
          // 如果值是对象，就递归一下
          // target[keys] = item[keys].constructor === Array ? [] : {}
          target[keys] = deepClone(item[keys])
        } else {
          // 如果不是，就直接赋值
          target[keys] = item[keys]
        }
      }
    }
    return target
  }
}
/**
 * 获取外链URL
 */
export function getOutLink () {
  let originURL = ''
  if (!window.location.origin) { // 兼容IE，IE11版本下location.origin为undefined
    originURL = window.location.protocol + '//' + window.location.hostname
  } else {
    originURL = window.location.origin
  }
  return originURL
}
// 删除cookie
export function delCookie (name) {
  document.cookie = name + '=;expires=' + (new Date(0)).toGMTString()
}
/*
  判断人员角色 import { validRole } from '@/common/utils/util'
    领导-组织推进 => 7
    领导-协调推进 => 6
    领导-指导把关 => 5
    独立承担 => 4
    主要负责 => 3
    参与 => 2
    辅助 => 1
*/
export function validRole (roleList) {
  /*
      1. 人员不能重复
      2. 领导角色（5，6，7）不能重复
      3. 独立承担参与人员只能有一人
      4. 主要负责需要参与或辅助角色
      5. 主要负责和独立承担至少有一个
    */
  let result = {
    status: true
  }
  let roleArr = []
  let newRoleList = []
  roleList.forEach(item => {
    roleArr.push(item.aseRole)
    newRoleList.push(item.empId)
  })
  newRoleList = Array.from(new Set(newRoleList))
  if (newRoleList.length !== roleList.length) {
    result = {
      errorMessage: '人员不能重复',
      status: false
    }
    return result
  }
  if ((roleArr.includes(5) && roleArr.includes(6)) || (roleArr.includes(5) && roleArr.includes(7)) || (roleArr.includes(6) && roleArr.includes(7))) {
    result = {
      errorMessage: '领导角色不能重复',
      status: false
    }
    return result
  }
  if (roleArr.includes(4) && roleArr.length > 1) {
    result = {
      errorMessage: '独立承担参与人员只能有一人',
      status: false
    }
    return result
  }
  if (roleArr.includes(3) && (!roleArr.includes(1) && !roleArr.includes(2))) {
    result = {
      errorMessage: '主要负责需要参与或辅助角色',
      status: false
    }
    return result
  }
  if (!roleArr.includes(4) && !roleArr.includes(3)) {
    result = {
      errorMessage: '主要负责和独立承担至少有一个',
      status: false
    }
    return result
  }
  return result
}
export function validRoleNegative (roleList) {
  /*
      有人员角色为全部责任时，不应有其他角色；有人员角色为主要责任的，必须有次要责任人
    */
  let result = {
    status: true
  }
  let roleArr = []
  let newRoleList = []
  roleList.forEach(item => {
    roleArr.push(item.aseRole)
    newRoleList.push(item.empId)
  })
  newRoleList = Array.from(new Set(newRoleList))
  if (newRoleList.length !== roleList.length) {
    result = {
      errorMessage: '人员不能重复',
      status: false
    }
    return result
  }
  if (roleArr.includes(4) && roleArr.length > 1) {
    result = {
      errorMessage: '有人员角色为全部责任时，不应有其他角色',
      status: false
    }
    return result
  }
  if (roleArr.includes(3) && !roleArr.includes(2)) {
    result = {
      errorMessage: '有人员角色为主要责任的，必须有次要责任人',
      status: false
    }
    return result
  }
  if (roleArr.includes(2) && !roleArr.includes(3)) {
    result = {
      errorMessage: '有人员角色为次要责任的，必须有主要责任人',
      status: false
    }
    return result
  }
  return result
}

/* 模糊搜索人名 如果输入中文则直接调接口搜索 
如果输入为其他字符则需要超过四个字符才会搜索*/
export function accessQuery(input) {
  return checkIsAllChinese(input) || input.length>=4
}

/**检查输入是否全部中文 */
export function checkIsAllChinese(input) {
  var reg = /^[\u4e00-\u9fa5]+$/;
  var len = input.length;
  var flag = true;
  if (!reg.test(input)) {
    flag = false;
  }
  return flag;
}