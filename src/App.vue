<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
// 设置 html 的 font-size，配置 rem
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  html.style.fontSize = Math.min(window.innerWidth / 10, 50) + 'px'
})
</script>

<style>
/* font */
@font-face {
  font-family: 'iconfont';  /* project id 1165145 */
  src: url('//at.alicdn.com/t/font_1165145_avs06k288b7.eot');
  src: url('//at.alicdn.com/t/font_1165145_avs06k288b7.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1165145_avs06k288b7.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1165145_avs06k288b7.woff') format('woff'),
  url('//at.alicdn.com/t/font_1165145_avs06k288b7.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1165145_avs06k288b7.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: 'PingFangSC-Light', 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', 'Arial', 'sans-serif'
}
</style>
