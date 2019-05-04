<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item"
          v-for="(item, index) in navigation.toc"
          :key="index"
          @click="jumpTo(item.href)">
          <p class="text">{{ item.label }}</p>
        </div>
      </div>
      <div v-else class="empty">加载中...</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'content-view',
  props: {
    ifShowContent: {
      type: Boolean,
      default: false
    },
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: {
      type: Object,
      default: () => {
        return {
          toc: []
        }
      }
    }
  },
  methods: {
    jumpTo(href) {
      this.$emit('jumpTo', href)
    }
  }
}
</script>

<style lang='scss'>
@import "../assets/styles/global.scss";

.content {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 102;
  width: 80%;
  height: 100%;
  background: white;
  .content-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    .content-item {
      padding: px2rem(20) px2rem(15);
      border-bottom: px2rem(1) solid #f4f4f4;
      cursor: pointer;
      .text {
        font-size: px2rem(14);
        color: #333;
      }
    }
  }
  .empty {
    width: 100%;
    height: 100%;
    @include center;
    font-size: px2rem(16);
    color: #333;
  }
}
</style>
