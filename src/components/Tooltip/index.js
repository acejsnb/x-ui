import Vue from 'vue'
import Tooltip from './Tooltip.vue'
 
export default function (el, binding) {
    el.style.cursor = 'pointer'
    let reg=/<\/?.+?\/?>/g  // 匹配标签元素的正则
    let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth  // 获取窗口的宽度
    let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight  // 获取窗口的高度
    let tipTop = 0
    let tipLeft = 0
    let toolTipDom = null
    let toolTipInstance = null
    let timeOut = null
    
    // 判断当用户点击时 鼠标所处的位置以及提示框与视框四周的距离
    el.onmouseenter = (e) => {
        let toolTipConstructor = Vue.extend(Tooltip)
        toolTipInstance = new toolTipConstructor()
        toolTipDom = toolTipInstance.$mount().$el
        let elStyles = window.getComputedStyle(el)
        let paddingLeft = parseInt(elStyles.paddingLeft.replace('px',''))
        let paddingRight = parseInt(elStyles.paddingLeft.replace('px',''))
        let {top, bottom, left, right, width, height} = el.getBoundingClientRect()  // 获取目标元素在页面中的位置
        if (binding && binding.value) {
            toolTipDom.innerText = binding.value  // 如果有传入信息则用传入信息
        } else {
            toolTipDom.innerText = el.innerHTML.replace(reg,'') // 如果没有传入信息则获取目标元素的内容
        }
        document.body.appendChild(toolTipDom)
        let styles =  window.getComputedStyle(toolTipDom)
        let tipW = parseInt(styles.width.replace('px', ''))  // 提示条的宽度
        let tipH = parseInt(styles.height.replace('px', '')) // 提示条的高度度
        let disX=e.offsetX  // 鼠标在目标元素的横向位置
        let disY=e.offsetY  // 鼠标在目标元素的纵向位置
        let halfDis = (tipW - width)/2 
        let centerFlag = (tipW > width) && (halfDis < left) && (halfDis < (winWidth - right))  // 如果tip的宽度比目标元素宽且左右都还有距离可供展示 则居中显示
        let centerLeft = halfDis 
        let checkLeft = (tipW - width) > left   // 检测屏幕左方是否有足够距离显示
        let checkRight = (tipW - width) > winWidth - right // 检测屏幕右方是否有足够距离显示
        let checkTop = top > tipH -4    // 检测屏幕上方是否有足够距离显示
        let checkBottom = winHeight - bottom > tipH -4 // 检测屏幕下方是否有足够距离显示
        
        if ( (disX < width/2) && (disY < height/2)) {
            // 第一种情况 鼠标在左上方
            tipLeft = checkRight ? (right -tipW) : centerFlag ? left - centerLeft : left + paddingLeft  // 先检测右边 再检测是否满足居中
            tipTop = checkTop ? top -(tipH - 4) : top + height - 4
        }
        // 第二种情况 鼠标在右上方
        if ( (disX > width/2) && (disY < height/2)) {
            tipLeft = checkLeft ? left : centerFlag ? left - centerLeft : width - tipW + left - paddingRight 
            tipTop = checkTop ? top -(tipH - 4) : top + height - 4
        }
        // 第三种情况 鼠标在左下方
        if ( (disX < width/2) && (disY > height/2)) {
            tipLeft = checkRight ? (right - tipW) : centerFlag ? left - centerLeft : left + paddingLeft 
            tipTop = checkBottom ? top + height - 4 : top -(tipH - 4) 
        }
        // 第四种情况 鼠标在右下方
        if ( (disX > width/2) && (disY > height/2)) {
            tipLeft = checkLeft ? left : centerFlag ? left - centerLeft : width - tipW + left - paddingRight 
            tipTop = checkBottom ? top + height - 4 : top -(tipH - 4) 
        }
  
        toolTipDom.style.zIndex = 10000
        toolTipDom.style.left = tipLeft + "px"
        toolTipDom.style.top = tipTop + 'px'
        toolTipDom.style.visibility = 'visible'
    }
    el.onmouseleave = () => {
        document.body.removeChild(toolTipDom)
        toolTipInstance.$destroy()
        toolTipDom = null
        toolTipInstance = null
        timeOut = null
    }
}


