<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': isSettingShow || !ifTitleAndMenuShow}" v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
          <i class="iconfont icon" @click="showSetting('content')">&#xe652;</i>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon" @click="showSetting('progress')">&#xe604;</i>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon" @click="showSetting('theme')">&#xe645;</i>
        </div>
        <div class="icon-wrapper">
          <span class="icon" @click="showSetting('size')">A</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="isSettingShow">
        <div class="setting-font-size" v-if="showTag === 'size'">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index"
              @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>
        <div class="setting-theme" v-else-if="showTag === 'theme'">
          <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(item.name)">
            <div class="preview" :style="{background: item.style.body.background}" :class="{'no-border': item.style.body.background !== '#fff'}"></div>
            <div class="text" :class="{'selected': item.name === defaultTheme}">{{ item.name }}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag === 'progress'">
          <div class="progress-wrapper">
            <input type="range"
              class="progress"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress">
          </div>
          <div class="text-wrapper">
            <span>{{ bookAvailable ? progress + '%' : '加载中...' }}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 目录组件 -->
    <content-view
      v-show="ifShowContent"
      :ifShowContent="ifShowContent"
      :navigation="navigation"
      :bookAvailable="bookAvailable"
      @jumpTo="jumpTo">
    </content-view>
    <!-- 目录的灰色背景 -->
    <transition name="fade">
      <div class="content-mask"
        v-show="ifShowContent"
        @click="hideContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from './Content.vue'

export default {
  name: "menu-bar",
  components: {
    ContentView
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array,
      default: () => []
    },
    defaultFontSize: {
      type: Number,
      default: 16
    },
    themeList: {
      type: Array,
      default: () => []
    },
    defaultTheme: {
      type: String,
      default: 'default'
    },
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isSettingShow: false,
      showTag: 'size',
      progress: 0,
      ifShowContent: false
    }
  },
  methods: {
    jumpTo(href) {
      this.$emit('jumpTo', href)
    },
    hideContent() {
      this.ifShowContent = false
    },
    onProgressChange(progress) {
      // 按下拖动松手的时候
      this.$emit('onProgressChange', progress)
    },
    onProgressInput(progress) {
      // 拖动的时候
      this.progress = progress
      // 重写了 input range 的样式
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    setFontSize(fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    setTheme(theme) {
      this.$emit('setTheme', theme)
    },
    showSetting(showTag) {
      this.showTag = showTag
      if (showTag === 'content') {
        this.isSettingShow = false
        this.ifShowContent = true
      } else {
        this.isSettingShow = true
      }
    },
    hideSetting() {
      // 父级组件调用
      this.isSettingShow = false
    }
  }
};
</script>

<style lang='scss'>
@import "../assets/styles/global.scss";

.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    z-index: 102;
    display: flex;
    background-color: #fff;
    box-shadow: 0 px2rem(-6) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      cursor: pointer;
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    z-index: 101;
    height: px2rem(60);
    background-color: #fff;
    box-shadow: 0 px2rem(-6) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        flex: 1;
        display: flex;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-11);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              border: px2rem(1) solid #ccc;
              background-color: #fff;
              box-shadow: 0 px2rem(2) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background-color: #000;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        width: 100%;
        bottom: px2rem(10);
        font-size: px2rem(14);
        text-align: center;
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, .8);
  }
}
</style>
