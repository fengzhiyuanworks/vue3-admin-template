import axios from "axios";
import { message } from "ant-design-vue";
import Vue from "vue";
//  params, import { localGetItem } from '@/common/utils/storageManage.js'

const getFile = (url, params, fileName, type) => {
  let data = type ? "data" : "params";
  type = type || "post";
  let header = {};
  if (Vue.ls.get("token")) {
    header["HRX-WEB-SESSION"] = Vue.ls.get("token");
    header["PASESSION"] = Vue.ls.get("token");
    // header['MENU'] = Vue.ls.get('menu')
    // header['MENU-ID'] = Vue.ls.get('MENU_ID')
    // header['Authorization'] = 'Basic c2NyZWVuOnZ0N3IxNWc='
  }
  return new Promise((resolve, reject) => {
    axios({
      headers: header,
      // headers: {
      //   header,
      //   // 'HRX-WEB-SESSION': localGetItem('pasession'),
      //   // 'PASESSION': localGetItem('pasession'),
      //   // 'MENU': localGetItem('menu'),
      //   // 'MENU-ID': localGetItem('MENU_ID')
      //   'hello': 'world111'
      // },
      withCredentials: true,
      url,
      method: type,
      [`${data}`]: params,
      responseType: "blob"
    })
      .then((res) => {
        console.log(res);
        let resHeaders = res.headers;
        let resFileName = resHeaders["content-disposition"];
        const linkUrl = window.URL.createObjectURL(new Blob([res.data]));
        // for IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          if (resFileName.includes(".rar")) {
            fileName = getDate(fileName, ".rar");
          }
          if (resFileName.includes(".zip")) {
            fileName = getDate(fileName, ".zip");
          }
          // if (resFileName.includes('.xls') && resFileName.includes('.xlsx')) {
          //   fileName = getDate(fileName, '.xls')
          // }
          if (resFileName.includes(".xlsx")) {
            fileName = getDate(fileName, ".xlsx");
          }
          if (resFileName.includes(".doc")) {
            link.download = getData(fileName, ".doc");
          }
          let csvData = new Blob([res.data], { type: "text/csv" });
          window.navigator.msSaveOrOpenBlob(csvData, fileName);
        } else {
          const link = document.createElement("a");
          link.href = linkUrl;
          if (fileName.includes(".xlsx") || fileName.includes(".xls")) {
            link.download = fileName;
          } else {
            if (resFileName.includes(".rar")) {
              link.download = getDate(fileName, ".rar");
            }
            if (resFileName.includes(".zip")) {
              link.download = getDate(fileName, ".zip");
            }
            if (resFileName.includes(".xls")) {
              link.download = getDate(fileName, ".xls");
            }
            if (resFileName.includes(".xlsx")) {
              link.download = getDate(fileName, ".xlsx");
            }
            if (resFileName.includes(".doc")) {
              link.download = getData(fileName, ".doc");
            }
          }
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // 下载完成移除元素
          window.URL.revokeObjectURL(linkUrl); // 释放掉blob对象
        }
        resolve("hello world");
      })
      .catch((erro) => {
        console.log(erro);
        message.error("文件导出失败");
        reject(`faild: ${erro}`);
      });
  });
};

function getDate(fileName, type) {
  let name = fileName || "xxx-admin";
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  // let hours = date.getHours()
  // let minutes = date.getMinutes()
  // let seconds = date.getSeconds()
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  let currentDate = `${name}${year}${month}${day}${type}`; // .xlsx
  return currentDate;
}

export default getFile;
