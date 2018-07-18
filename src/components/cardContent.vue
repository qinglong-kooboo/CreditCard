<template>
  <div class="rotate-wrapper">
    <transition name="frontCardRotate">
      <div class='card-content' v-show="showFlag">
        <v-background :bgActiveFlag="bgActiveFlag" :bgColor="bgColor"></v-background>
        <div class="card-icon">
          <svg width="42" height="26" viewBox="0 0 100 76" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <defs><linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="a">
              <stop stop-color="#F3D08F" offset="0%"/>
              <stop stop-color="#FAD766" offset="100%"/></linearGradient></defs>
            <path d="M92.727 75.455h-85.455c-4 0-7.273-3.273-7.273-7.273v-60.909c0-4 3.273-7.273 7.273-7.273h85.455c4 0 7.273 3.273 7.273 7.273v60.909c0 4-3.273 7.273-7.273 7.273" fill="url(#a)"/>
            <path d="M72.123 28.485h27.878v-1.818h-29.648c-.965 0-1.832.601-2.172 1.504-2.287 6.072-2.433 12.594-.438 19.842.455 1.654.435 3.4-.1 5.03-2.036 6.195-7.779 19.988-18.551 19.988-11.008 0-16.096-15.699-17.334-21.952-.155-.784-.122-1.592.107-2.357 1.695-5.648 2.094-10.64-.016-19.59-.205-.87-.182-1.783.048-2.646 4.48-16.755 12.882-20.147 12.965-20.179.356-.132.593-.472.593-.852v-5.455h-1.818v3.776c0 .65-.332 1.252-.884 1.596-2.803 1.742-8.904 6.936-12.557 20.456-.18.668-.781 1.136-1.473 1.133l-28.722-.139v1.818l27.416.133c1.468.007 2.735 1.041 3.037 2.478 1.416 6.741 1.219 11.039.082 15.458-.316 1.23-1.42 2.096-2.69 2.109l-27.844.27v1.819l28.605-.278c.693-.007 1.296.473 1.435 1.152 1.442 7.041 6.887 23.07 19.05 23.07 6.368 0 12.062-4.25 16.467-12.29 2.644-4.828 4.067-9.591 4.541-11.346h29.901v-1.818h-28.016c-1.158 0-2.183-.772-2.489-1.889-1.692-6.164-1.761-11.755-.2-16.959.371-1.235 1.538-2.061 2.827-2.061zm-17.15-21.914c.045.022 4.519 2.322 9.253 10.041.172.28.47.434.776.434.198 0 .399-.064.571-.202.365-.292.416-.837.172-1.235-3.57-5.805-7.024-8.71-8.775-9.931-.43-.299-.68-.792-.68-1.315v-4.363h-1.818v5.758c0 .345.195.659.502.813z" fill="#0C0200"/>
          </svg>
        </div>
        <div class='card-dot' :class="{active: focusCardNumbersFlag}">
          {{cardNumbersComputed | addSpace}}
        </div>
        <span class="card-name" :class="{active: focusCardNameFlag}">
              {{cardNameComputed}}
            </span>
        <span class="valid-thru" :class="{active: focusCardValidateFlag}">
              valid thru
            </span>
        <span class="valid-thru-value" :class="{active: focusCardValidateFlag}">
              {{cardValidThruComputed | addSprit}}
            </span>
      </div>
    </transition>
    <transition name="backCardRotate">
      <div class="card-content-converse" v-show="!showFlag">
        <v-background :bgActiveFlag="bgActiveFlag" :bgColor="bgColor"></v-background>
        <div class="blackTip"></div>
        <div class="whiteTip">
          <span class="signature-input">{{cardValidate}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { addDot } from '../utils/addDot.js'
export default {
  props: {
    cardNumbers: {
      type: String,
      defalut: ''
    },
    cardName: {
      type: String,
      defalut: ''
    },
    cardValidate: {
      type: String,
      defalut: ''
    },
    cardValidThru: {
      type: String,
      defalut: ''
    },
    showFlag: {
      type: Boolean,
      defalut: true
    }
  },
  data () {
    return {
      focusCardNumbersFlag: false,
      focusCardNameFlag: false,
      focusCardValidateFlag: false
    }
  },
  filters: {
    addSpace: function (value) {
      return value.toString().replace(/\s/g, '').replace(/[^\S]/g, '').replace(/(\S{4})(?=\S)/g, '$1 ')
    },
    addSprit: function (value) {
      return value.toString().replace(/\s/g, '/').replace(/[^\S]/g, '/').replace(/(\S{2})(?=\S)/g, '$1/')
    }
  },
  computed: {
    bgColor: function () {
      let num = parseInt(this.cardNumbers.substring(0, 2))
      if (num === 49) {
        return 'linear-gradient(25deg, #0f509e, #1399cd)'
      } else if (num === 51) {
        return 'linear-gradient(25deg, #f37b26, #fdb731)'
      } else if (num === 37) {
        return 'linear-gradient(25deg, #f30b16, #fda700)'
      } else if (num === 36) {
        return 'linear-gradient(25deg, #308c67, #a3f2cf)'
      }
    },
    bgActiveFlag: function () {
      if (this.cardNumbers && this.cardNumbers.length > 1) {
        let num = parseInt(this.cardNumbers.substring(0, 2))
        if (num === 49 || 51 || 37 || 36) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    cardNumbersComputed: function () {
      return addDot(this.cardNumbers, 16)
    },
    cardNameComputed: function () {
      return (this.cardName ? this.cardName : 'Your Name Here')
    },
    cardValidThruComputed: function () {
      return addDot(this.cardValidThru, 4)
    }
  },
  components: {
    'v-background': resolve => require(['components/cardBackground.vue'], resolve)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .rotate-wrapper
    position: absolute
    left: 800px
    top: 30px
    width: 290px
    height: 182px
    transform:translate3d(0,0,0)
    perspective: 1000px
    .card-content
      position: absolute
      left 0
      top 0
      width: 290px;
      height: 182px
      background-color: rgb(153, 153, 153);
      border-radius 14.5px
      transform:transition3d(0,0,0)
      transform-style preserve-3d
      transition: transform .2s linear
      overflow: hidden
      z-index: 20
      &.frontCardRotate-enter-active,&.frontCardRotate-leave-active
        transform rotateY(90deg)
      .card-icon
        position: absolute
        height:42px
        width 26px
        top:20px
        left:25px
        z-index:100
      .card-dot
        position: absolute
        height:30px
        line-height 30px
        left:30px
        top 85px
        font-size 20px
        font-family: Consolas, Courier, monospace
        z-index:100
        &.active
          transition opacity .3s
          opacity 1
          font-weight 700
      .card-name
        position: absolute
        width: 174px
        height:20px
        line-height 20px
        left:30px
        bottom: 25px
        font-size 17px
        overflow:hidden
        white-space nowrap
        text-overflow: ellipsis
        text-transform: uppercase
        font-family: Consolas, Courier, monospace
        font-size: 17px
        z-index:100
        &.active
          transition opacity .3s
          opacity 1
          font-weight 700
      .valid-thru
        position: absolute
        height:12px
        line-height 12px
        top:120px
        right: 30px
        font-size 10px
        color: #fff
        z-index:100
        &.active
          transition opacity .3s
          opacity 1
          font-weight 700
      .valid-thru-value
        position: absolute
        height:12px
        line-height 12px
        top:141px
        left: 208px
        font-size 16px
        color: #fff
        z-index:100
        &.active
          transition opacity .3s
          opacity 1
          font-weight 700
    .card-content-converse
      position: absolute
      left 0
      top 0px
      width: 290px;
      height: 182px
      overflow: hidden
      background-color: rgb(153, 153, 153);
      border-radius 14.5px
      transform:transition3d(0,0,0)
      transform-style preserve-3d
      transition: transform .2s linear
      &.backCardRotate-enter-active, &.backCardRotate-leave-active
        transform: rotateY(-90deg)
      .blackTip
        position: absolute
        width 100%
        height:40px
        top 20px
        left: 0
        background-color: #000
        z-index:100
      .whiteTip
        position: absolute
        width 217px
        height:33px
        top 68px
        left: 16px
        z-index:100
        background: repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%)
        .signature-input
          display block
          position: absolute
          top: 15px
          right: 5px
          height:14px
          color: #222
          font-family: Consolas, Courier, monospace
          font-size: 14px
          z-index:100
</style>
