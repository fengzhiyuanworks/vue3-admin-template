import { waterMark, addObserve } from '@/common/utils/waterMark'
import { throttle } from 'lodash'
let commonPlugin = {}
commonPlugin.install = function(Vue) {
  /**
   * limitWord 字数限制指令
   * 指令用法：
   *  - 在需要控制显示字数限制的input，textarea中使用 会在末尾加上 0/maxLength
   *     <a-input v-limitWord="{maxLength:20}"/>
   */
  Vue.directive('limitWord', {
    inserted: function(el, binding, vnode) {
      const maxLength = binding.value.maxLength
      const targetEl = el.querySelector('.ant-input') || el
      // 添加maxLength属性
      // targetEl.setAttribute('maxLength', maxLength)
      targetEl.parentElement.style.display = 'block'
      // 插入显示字数元素
      const insertEl = document.createElement('span')
      insertEl.setAttribute('class', 'lengthSpan')
      insertEl.style.bottom = '-19px'
      insertEl.style.right = '0px'
      insertEl.style.lineHeight = '20px'
      insertEl.style.color =
        targetEl.value.length > maxLength ? 'red' : '#cbcbcb'
      insertEl.innerText = `${targetEl.value.length}/${maxLength}`
      insertEl.style.position = 'absolute'
      targetEl.parentElement.appendChild(insertEl)
    },
    update(el, binding) {
      const maxLength = binding.value.maxLength
      const targetEl = el.querySelector('.ant-input') || el
      let insertEl = targetEl.parentElement.querySelector('.lengthSpan')
      if (insertEl) {
        setTimeout(() => {
          insertEl.innerText = `${targetEl.value.length}/${maxLength}`
          insertEl.style.color =
            targetEl.value.length > maxLength ? 'red' : '#cbcbcb'
        }, 10)
      }
    }
  })
  Vue.directive('move', {
    bind: el => {
      let modal = el.querySelector('.ant-modal-content')
      let title = modal.querySelector('.ant-modal-header')
      title.style.cursor = 'move'
      let modalRect = modal.getBoundingClientRect()
      // 顶部最大位置偏移量(60和200分别是头部导航的高和左侧菜单栏的宽)
      let minTopTranslate = 60 - modalRect.top
      let minLeftTranslate = 200 - modalRect.left
      title.onmousedown = function($ev) {
        let oevent = $ev || event
        let oriX = oevent.clientX
        let oriY = oevent.clientY
        oevent.stopPropagation()
        modal.style.userSelect = 'none'
        modal.style.webkitUserSelect = 'none'
        modal.style.msUserSelect = 'none'
        let oriTranslate = modal.style.transform
        let translateX = oriTranslate
          ? oriTranslate
              .split(',')[0]
              .slice(10, oriTranslate.split(',')[0].length - 2)
          : 0
        let translateY = oriTranslate
          ? oriTranslate
              .split(',')[1]
              .slice(0, oriTranslate.split(',')[1].length - 3)
          : 0
        // 视图的宽高（放在这里是为了浏览器窗口大小变化时能保证有效区正确）
        let bodyWidth = document.body.clientWidth
        let bodyHeight = document.body.clientHeight
        let maxTopTranslate = +bodyHeight - modalRect.top - modalRect.height - 5
        let maxLeftTranslate = +bodyWidth - modalRect.left - modalRect.width - 5
        document.onmousemove = throttle(function(ev) {
          let $event = ev || event
          let moveX = $event.clientX - oriX
          let moveY = $event.clientY - oriY
          if (moveX === 0 || moveY === 0) {
            return
          }
          let finalX = Number(translateX) + Number(moveX)
          if (finalX <= minLeftTranslate) {
            finalX = minLeftTranslate
          }
          if (finalX >= maxLeftTranslate) {
            finalX = maxLeftTranslate
          }
          let finalY = Number(translateY) + Number(moveY)
          if (finalY <= minTopTranslate) {
            finalY = minTopTranslate
          }
          if (finalY >= maxTopTranslate) {
            finalY = maxTopTranslate
          }
          modal.style.webkitTransform = `translate(${finalX}px, ${finalY}px)`
          modal.style.msTransform = `translate(${finalX}px, ${finalY}px)`
          modal.style.mozTransform = `translate(${finalX}px, ${finalY}px)`
          modal.style.transform = `translate(${finalX}px, ${finalY}px)`
        }, 100)
        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
          modal.style.userSelect = 'unset'
          modal.style.webkitUserSelect = 'unset'
          modal.style.msUserSelect = 'unset'
        }
      }
    }
  })
  Vue.prototype.$waterMark = waterMark
  Vue.prototype.$addObserve = addObserve
}
export default commonPlugin
