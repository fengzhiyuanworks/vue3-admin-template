// import request from '@/utils/request'
import axios from 'axios'
import Vue from 'vue'
/*
      @param {name} mr [系统标识]---如swmCore
      @param {uid} mr [用户ID]
   */
export function getBasePng (name, uid) {
  /*
      @param {number} mr [间距]
   */
  function drawImg (numberX = 4, numberY = 2, image, opt) {
    var canVas = document.createElement('canvas')
    canVas.id = 'cav'
    document.body.appendChild(canVas)
    const width = window.screen.availWidth
    const height = window.screen.availHeight
    var canvas = document.getElementById('cav')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    canVas.style.position = 'fixed'

    canVas.style.opacity = opt
    canVas.style.zIndex = '9999'
    canVas.style.pointerEvents = 'none'
    var ctx = canvas.getContext('2d')
    if (numberX == 2) {
      canVas.style.top = '10%'
      canVas.style.left = '7%'
    } else if (numberX == 4) {
      canVas.style.left = '7%'
      canVas.style.top = '5px'
    } else {
      canVas.style.left = '3%'
      canVas.style.top = '5px'
    }

    var img = new Image()
    img.src = image
    img.onload = function () {
      const imgWidth = JSON.parse((img.width) / 4)
      const imgHeight = JSON.parse((img.height) / 4)
      // 绘制图片默认铺满屏幕
      for (var i = 0; i <= numberX; i++) {
        for (var j = 0; j <= numberY; j++) {
          // 动态计算每一张图片需要绘制的起始点的坐标
          ctx.drawImage(img, (i * (width / numberX)) + 50, (j * (height / numberY)), imgWidth, imgHeight)
        }
      }
    }
  }
  var densityA, densityB, opt

  let header = {}
  if (Vue.ls.get('token')) {
    header['HRX-WEB-SESSION'] = Vue.ls.get('token')
    header['PASESSION'] = Vue.ls.get('token')
    header['MENU'] = Vue.ls.get('menu')
    header['MENU-ID'] = Vue.ls.get('MENU_ID')
    header['Authorization'] = 'Basic c2NyZWVuOnZ0N3IxNWc='
  }
  axios.get(`/screen/userPlan/getWatermarkPic/${uid}`, {// https://ftqw.qiyetest-os.pingan.com.cn
    headers: header
  }).then(res => {
    const data = res.data.data
    if (data) {
      densityA = data.watermarkDensity.split('')[data.watermarkDensity.split('').length - 1]
      densityB = data.watermarkDensity.substring(0, 1)
      opt = data.watermarkPellucidity

      drawImg(densityA, densityB, `data:image/png;base64,${data.watermarkPic}`, opt)
    }
  })
  // 注释
  // request({
  //   url: `/screen/userPlan/getWatermarkPic/${uid}`,
  //   method: 'get',
  //   headers: {
  //     'Authorization': 'Basic c2NyZWVuOnZ0N3IxNWc='
  //   }
  // }).then(res => {
  //   debugger
  //   if (res.data) {
  //     densityA = res.data.watermarkDensity.split('')[res.data.watermarkDensity.split('').length - 1]
  //     densityB = res.data.watermarkDensity.substring(0, 1)
  //     opt = res.data.watermarkPellucidity

  //     // getBasePng的参数存起来给友方用
  //     localStorage.setItem('waterMarkName', name)
  //     localStorage.setItem('waterMarkUid', name)

  //     drawImg(densityA, densityB, `data:image/png;base64,${res.data.watermarkPic}`, opt)
  //   }
  // })

  var socket
  if (!!window.WebSocket && window.WebSocket.prototype.send) {
    // let url = `ws://30.99.144.32:8000/screen/websocket/${name}/${uid}`
    let url = `ws://${window.location.origin.split('//')[1]}/screen/websocket/${name}/${uid}`
    socket = new WebSocket(url)
    // 相当于channel的read事件，ev 收到服务器回送的消息
    socket.onmessage = function (ev) {
      if (ev.data.length > 8) {
        let data = JSON.parse(ev.data)
        if (data.watermarkDensity == null) {
          var base = document.getElementById('cav')
          document.body.removeChild(base)
        } else {
          densityA = data.watermarkDensity.split('')[data.watermarkDensity.split('').length - 1]
          densityB = data.watermarkDensity.substring(0, 1)
          opt = data.watermarkPellucidity
          drawImg(densityA, densityB, `data:image/png;base64,${data.watermarkPic}`, opt)
        }
      } else {
        if (document.getElementById('cav')) {
          var base = document.getElementById('cav')
          document.body.removeChild(base)
        }
      }
    }
    // 相当于连接开启
    socket.onopen = function (ev) {
      socket.send(
        JSON.stringify({
          // 连接成功将，用户ID传给服务端
          uid: uid
        })
      )
    }
    // 相当于连接关闭
    socket.onclose = function (ev) { }
  } else {
    alert('您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！')
  }
}
