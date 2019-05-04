<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="ifTitleAndMenuShow">
      <div class="left">
        <i class="iconfont icon">&#xe617;</i>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <i class="iconfont icon">&#xe601;</i>
          <i class="iconfont icon">&#xe6a3;</i>
          <i class="iconfont icon">&#xe706;</i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "title-bar",
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang='scss'>
@import '../assets/styles/global.scss';

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(48);
  z-index: 101;
  display: flex;
  background-color: #fff;
  box-shadow: 0 px2rem(6) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
      .icon {
        width: 50px;
      }
    }
  }
}
</style>
