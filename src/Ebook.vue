<template>
  <div class="ebook">
    <title-bar :ifTitleAndMenuShow='ifTitleAndMenuShow'></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar ref="menuBar"
      :ifTitleAndMenuShow='ifTitleAndMenuShow'
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :navigation="navigation"
      @jumpTo="jumpTo">
    </menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from './components/TitleBar.vue'
import MenuBar from './components/MenuBar.vue'
const DOWNLOAD_URL = '/23776.epub'

export default {
  name: 'ebook',
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      book: null,
      themes: null,
      ifTitleAndMenuShow: false,
      fontSizeList: [
        {fontSize: 12},
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
        {fontSize: 22},
        {fontSize: 24}
      ],
      defaultFontSize: 16,
      themeList: [{
        name: 'default',
        style: {
          body: {
            'color': '#000',
            'background': '#fff'
          }
        }
      }, {
        name: 'eye',
        style: {
          body: {
            'color': '#000',
            'background': '#ceeaba'
          }
        }
      }, {
        name: 'night',
        style: {
          body: {
            'color': '#fff',
            'background': '#000'
          }
        }
      }, {
        name: 'gold',
        style: {
          body: {
            'color': '#000',
            'background': 'rgb(241, 236, 226)'
          }
        }
      }],
      defaultTheme: 'default',
      locations: {}, // 进度条对象
      bookAvailable: false, // 图书的进度是否可用
      navigation: {} // 图书目录信息
    }
  },
  mounted() {
    this.showEpub()
  },
  methods: {
    // 根据链接跳转到指定的位置
    jumpTo(href) {
      this.rendition.display(href)
      this.hiddTitleAndMenu()
    },
    onProgressChange(progress) {
      // progress 进度条数值 (0-100)
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      // console.log(location) // epubcfi(/6/30[page]!/4/2/6/12/1:19)
      this.rendition.display(location)
    },
    setTheme(name) {
      this.themes.select(name)
      this.defaultTheme = name
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    setFontSize(fontSize) {
      if (this.themes) {
        // 字体大小
        this.themes.fontSize(fontSize + 'px')
        this.defaultFontSize = fontSize
      }
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting()
      }
    },
    hiddTitleAndMenu() {
      // 隐藏标题栏和菜单栏
      this.ifTitleAndMenuShow = false
      // 隐藏菜单栏弹出的设置栏
      this.$refs.menuBar.hideSetting()
      // 隐藏目录
      this.$refs.menuBar.hideContent()
    },
    showEpub() {
      // 生成 book
      this.book = new Epub(DOWNLOAD_URL)
      // console.log(this.book)
      // 生成 Rendition，动过Book.renderTo
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 通过 rendition.display渲染电子书
      this.rendition.display()
      // 获取theme对象
      this.themes = this.rendition.themes
      // 设置默认字体大小
      this.setFontSize(this.defaultFontSize)
      // 主题修改1.注册主题 this.themes.register(name, styles)
      this.registerTheme()
      // 主题修改2.主题选择 this.themes.select(name)
      this.setTheme(this.defaultTheme)
      // 获取 locations 对象，控制进度 默认不会生成 locations 对象
      // console.log(this.book.locations._locations)
      // 通过 epubjs 的钩子函数来实现 locations 对象的生成
      this.book.ready.then(() => {
        this.navigation = this.book.navigation // 目录信息
        // console.log(this.navigation) // navigation 中的 toc 为目录信息
        this.book.locations.generate() // 生成导航进度信息 返回 locations._locations Array [epubcfi(/6/3[page]!/4/2,/2/1:0,/6/12/1:19)] epubcfi 定位符规范
      }).then(() => {
        this.locations = this.book.locations
        this.bookAvailable = true
      })
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/global.scss';

.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      display: flex;
      .left {
        flex: 0 0 20%;
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 20%;
      }
    }
  }
}
</style>
