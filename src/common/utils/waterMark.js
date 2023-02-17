// const combStr = compileStr('')
const unCombStr = uncompileStr('%7D%D1%C0%D6%D8%D5%D9%D7%D1%CC%CE%D3%DD')
const sesMarkSize = uncompileStr('x%CE%D3%DD%D0%D7%D1%D2%DC%E3%DF')
const sesMarkWidth = uncompileStr('o%CB%C9%CF%D5%CC%C4%D6%E0%CD%D8%DC')
// console.log('combStr === ', combStr, ', unCombStr === ', unCombStr)

export function waterMark (args) {
  // 默认设置
  var settings = {
    marker_alpha: 0.15, // 透明度
    marker_max: 30, // 最长文字限制
    marker_txt: uncompileStr('Y%91nz%AE%D3%DD%D0%D7'), // 文字内容
    marker_size: 16, // 字体大小
    marker_weight: 400, // 字体粗细
    marker_color: '#000000', // 字体颜色
    marker_family: '微软雅黑', // 字体
    marker_x_space: 400, // x轴间隔
    marker_y_space: 300, // y轴间隔
    marker_angle: 30, // 倾斜角度
    marker_gap: 80 // 文案超宽之后的横向间距保持
  }
  // 用传入配置内容 覆盖 默认设置
  if (arguments.length === 1 && typeof arguments[0] === 'object') {
    var setter = arguments[0] || {}
    // settings = { ...settings, ...setter }
    for (let key in setter) {
      if (setter[key] && settings[key] && setter[key] === settings[key]) {
        continue
      } else if (setter[key]) {
        settings[key] = setter[key]
      }
    }
  }

  // 最长文字内容限制
  var waterText = settings.marker_txt
  if (waterText.length > settings.marker_max) {
    const temp = waterText.split('-')
    temp[1].substring(2)
    waterText = temp.join('-')
  }
  let Mnode = document.body.querySelector('#' + unCombStr)
  var mask = Mnode || document.createElement('div')
  mask.id = unCombStr
  mask.className = unCombStr
  mask.style.width = '100%'
  mask.style.height = '100%'
  mask.style.position = 'fixed'
  mask.style.top = '0'
  mask.style.opacity = settings.marker_alpha
  mask.style.zIndex = '9999'
  mask.style.pointerEvents = 'none'

  // 获取页面有效宽度
  var pageWidth = Math.max(document.body.offsetWidth, document.body.scrollWidth, document.body.clientWidth)
  // 获取页面有效高度
  var pageHeight = Math.max(document.body.offsetHeight, document.body.scrollHeight, document.body.clientHeight)

  // 创建canvas对象
  var can = document.createElement('canvas')
  // canvas对象 放入节点
  mask.appendChild(can)
  // 设置canvas 宽度 & 高度
  can.width = pageWidth
  can.height = pageHeight
  // ‘隐藏’canvas对象
  can.style.display = 'none'
  can.style.zIndex = '0'
  // 使用canvas-API 设置倾斜角度以及文字样式
  var cans = can.getContext('2d')
  cans.rotate(-settings.marker_angle * Math.PI / 180)
  cans.font = `${settings.marker_weight} ${settings.marker_size}px ${settings.marker_family}`
  cans.fillStyle = settings.marker_color
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  // 调整水印显示范围
  sessionStorage.setItem(sesMarkSize, settings.marker_size)
  const curWidth = Math.round(cans.measureText(waterText).width) // 水印内容的占宽
  if (curWidth > settings.marker_x_space) {
    settings.marker_x_space = curWidth + settings.marker_gap
  }
  sessionStorage.setItem(sesMarkWidth, settings.marker_x_space + '-' + curWidth)
  /*
    由于有旋转角度，为让文字铺满，宽高需要一定比例的放大
    双重遍历：直到 宽度小于页面‘宽度’时,
             直到 高度小于页面‘高度’时
  */
  // TODO Height的放大倍数 随窗口视区高度变大而减小
  for (let i = (pageHeight * 0.5) * -1; i < pageWidth; i += settings.marker_x_space) {
    for (let j = 0; j < pageHeight * 2.2; j += settings.marker_y_space) {
      // 填充内容： 文字，x轴点, y轴点
      cans.fillText(waterText, i, j)
    }
  }
  // 将canvas对象 转为图片并且设置为背景
  const canvaImgUrl = `url(${can.toDataURL('image/png')})`
  mask.style.backgroundImage = canvaImgUrl
  if (Mnode) { // 窗口缩放时，只变换背景内容，不需要增删节点
    Mnode.style.backgroundImage = canvaImgUrl
  } else {
    document.body.appendChild(mask)
  }
  return canvaImgUrl
}

export function addObserve (maskUrl) {
  let Mnode = document.body.querySelector('#pa_water_mark')
  var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
  var o = new MutationObserver(function (ms, obs) {
    // console.log('ms === ', ms)
    // console.log('obs === ', obs)
    ms.forEach(function (m) {
      if (m.type === 'attributes') {
        if (!m.target.style.backgroundImage) {
          m.target.style.backgroundImage = maskUrl
        } else if (!m.target.style.opacity || m.target.style.opacity === '0') {
          m.target.style.opacity = 0.3
        }
      } else if (m.type === 'childList') {
        if (!document.body.contains(Mnode)) {
          document.body.appendChild(Mnode)
        }
      }
    })
  })
  o.observe(Mnode, {
    attributes: true,
    attributeFilter: ['style']
  })
  o.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// 字符串-解密
function uncompileStr (code) {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}
