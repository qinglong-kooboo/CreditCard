<template>
  <div class='creditCard'>
      <form class="rotate-wrapper">
        <transition name="rotate1">
          <div class='card-content' v-show="showFlag">
            <div class="card-icon">
              <img :src="imgUrl" :style="{width: iconWidth, height: iconHeight }">
            </div>
            <div class='card-dot'>
              {{cardNumbersComputed | addSpace}}
            </div>
            <span class="card-name">
              {{cardNameComputed}}
            </span>
            <span class="valid-thru">
              valid thru
            </span>
            <span class="valid-thru-value">
              {{cardValidThruComputed | addSprit}}
            </span>
          </div>
        </transition>
        <transition name="rotate2">
          <div class="card-content-converse" v-show="!showFlag">
            <div class="blackTip"></div>
            <div class="whiteTip">
              <span class="signature-input">{{cardValidate}}</span>
            </div>
          </div>
        </transition>
      </form>
      <div class='container-number'>
      <input placeholder='Card Number' class='form-card-number'
      @input="handleInputCardNumbers"
       maxlength='16'
       @focus='colorFlag = !colorFlag'
       v-model='cardNumbers'
       @click="showFlag = true"
       >
    </div>
      <v-alertMsg :msgContent="msgContent" v-show="msgNumberFlag"></v-alertMsg>
      <small>E.g.: 49..., 51..., 36..., 37...</small>
      <div class='container-name'>
        <input type='text' placeholder='Name' class='form-card-name'
        @click="showFlag = true"
        v-model="cardName"
        >
      </div>
      <v-alertMsg :msgContent="msgContent" v-show="msgNameFlag"></v-alertMsg>
      <div class='container-valid-cvc'>
          <input type='text' placeholder='Valid Thru' class='form-card-date'
                 @click="showFlag = true"
                 maxlength='4'
                 v-model="cardValidThru"
                 @input="handleInputCardValidThru">
          <input type='text' placeholder='CVC' class='form-card-validate'
                 @keyup.9="showFlag = false"
                 @click="showFlag = false"
                 v-model="cardValidate"
                 maxlength='4'
                 @input="handleInputCardValidate">
      </div>
      <div class="validThruWrapper" v-show="msgValidThruFlag">
        <v-alertMsg :msgContent="msgContent"></v-alertMsg>
      </div>
      <div class="validateWrapper" v-show="msgValidateFlag">
        <v-alertMsg :msgContent="msgContent"></v-alertMsg>
      </div>
      <Button class='button-pay' @click="submit">PAY</Button>
      <div class="cardReportWrapper">
        <div class="cardReport" v-show="reportConfirmFlag">
          <span>number: {{cardNumbers}}</span><br/>
          <span>name: {{cardName}}</span><br/>
          <span>expiry: {{cardValidate}}</span><br/>
          <span>cvc: {{cardValidThru}}</span><br/>
          <span>issuer:</span>
        </div>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { addDot } from '../utils/addDot.js'
export default {
  data () {
    return {
      showFlag: true,
      colorFlag: false,
      reportConfirmFlag: false,
      msgNumberFlag: false,
      msgNameFlag: false,
      msgValidateFlag: false,
      msgValidThruFlag: false,
      cardNumbers: '',
      cardValidate: '',
      cardName: '',
      cardValidThru: '',
      msgContent: '',
      iconWidth: '42px',
      iconHeight: '26px',
      imgUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc2IiB2aWV3Qm' +
       '94PSIwIDAgMTAwIDc2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZl' +
        'QXNwZWN0UmF0aW89InhNaWRZTWlkIj48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjEwMCUiIHkxPSIw' +
         'JSIgeDI9IjAlIiB5Mj0iMTAwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGM0QwOEYiIG9mZnNl' +
          'dD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkFENzY2IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhck' +
           'dyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNOTIuNzI3IDc1LjQ1NWgtODUuNDU1Yy00IDAtNy4yNzMt' +
            'My4yNzMtNy4yNzMtNy4yNzN2LTYwLjkwOWMwLTQgMy4yNzMtNy4yNzMgNy4yNzMtNy4yNzNoODUu' +
             'NDU1YzQgMCA3LjI3MyAzLjI3MyA3LjI3MyA3LjI3M3Y2MC45MDljMCA0LTMuMjczIDcuMjczLTcu' +
              'MjczIDcuMjczIiBmaWxsPSJ1cmwoI2EpIi8+PHBhdGggZD0iTTcyLjEyMyAyOC40ODVoMjcuODc' +
               '4di0xLjgxOGgtMjkuNjQ4Yy0uOTY1IDAtMS44MzIuNjAxLTIuMTcyIDEuNTA0LTIuMjg3IDYu' +
                'MDcyLTIuNDMzIDEyLjU5NC0uNDM4IDE5Ljg0Mi40NTUgMS42NTQuNDM1IDMuNC0uMSA1Lj' +
                 'AzLTIuMDM2IDYuMTk1LTcuNzc5IDE5Ljk4OC0xOC41NTEgMTkuOTg4LTExLjAwOCAwLTE2L' +
                  'jA5Ni0xNS42OTktMTcuMzM0LTIxLjk1Mi0uMTU1LS43ODQtLjEyMi0xLjU5Mi4xMDctMi4' +
                   'zNTcgMS42OTUtNS42NDggMi4wOTQtMTAuNjQtLjAxNi0xOS41OS0uMjA1LS44Ny0uMTgyL' +
                    'TEuNzgzLjA0OC0yLjY0NiA0LjQ4LTE2Ljc1NSAxMi44ODItMjAuMTQ3IDEyLjk2NS0yMC' +
                     '4xNzkuMzU2LS4xMzIuNTkzLS40NzIuNTkzLS44NTJ2LTUuNDU1aC0xLjgxOHYzLjc3Nm' +
                      'MwIC42NS0uMzMyIDEuMjUyLS44ODQgMS41OTYtMi44MDMgMS43NDItOC45MDQgNi45Mz' +
                       'YtMTIuNTU3IDIwLjQ1Ni0uMTguNjY4LS43ODEgMS4xMzYtMS40NzMgMS4xMzNsLTI4L' +
                        'jcyMi0uMTM5djEuODE4bDI3LjQxNi4xMzNjMS40NjguMDA3IDIuNzM1IDEuMDQxID' +
                         'MuMDM3IDIuNDc4IDEuNDE2IDYuNzQxIDEuMjE5IDExLjAzOS4wODIgMTUuNDU4LS' +
                          '4zMTYgMS4yMy0xLjQyIDIuMDk2LTIuNjkgMi4xMDlsLTI3Ljg0NC4yN3YxLjgx' +
                           'OWwyOC42MDUtLjI3OGMuNjkzLS4wMDcgMS4yOTYuNDczIDEuNDM1IDEuMTUy' +
                            'IDEuNDQyIDcuMDQxIDYuODg3IDIzLjA3IDE5LjA1IDIzLjA3IDYuMzY4IDAg' +
                             'MTIuMDYyLTQuMjUgMTYuNDY3LTEyLjI5IDIuNjQ0LTQuODI4IDQuMDY3LTk' +
                              'uNTkxIDQuNTQxLTExLjM0NmgyOS45MDF2LTEuODE4aC0yOC4wMTZjLTE' +
                               'uMTU4IDAtMi4xODMtLjc3Mi0yLjQ4OS0xLjg4OS0xLjY5Mi02LjE2NC0' +
                                'xLjc2MS0xMS43NTUtLjItMTYuOTU5LjM3MS0xLjIzNSAxLjUzOC0yLjA2MS' +
                                 'AyLjgyNy0yLjA2MXptLTE3LjE1LTIxLjkxNGMuMDQ1LjAyMiA0LjUxOSAyL' +
                                  'jMyMiA5LjI1MyAxMC4wNDEuMTcyLjI4LjQ3LjQzNC43NzYuNDM0LjE5OCAwIC' +
                                   '4zOTktLjA2NC41NzEtLjIwMi4zNjUtLjI5Mi40MTYtLjgzNy4xNzItMS4yM' +
                                    'zUtMy41Ny01LjgwNS03LjAyNC04LjcxLTguNzc1LTkuOTMxLS40My0uMjk5' +
                                     'LS42OC0uNzkyLS42OC0xLjMxNXYtNC4zNjNoLTEuODE4djUuNzU4YzAgLj' +
                                      'M0NS4xOTUuNjU5LjUwMi44MTN6IiBmaWxsPSIjMEMwMjAwIi8+PC9zdmc+'
    }
  },
  components: {
    'v-alertMsg': resolve => require(['components/alertMsg.vue'], resolve)
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
  methods: {
    submit () {
      if (!this.cardNumbers) {
        this.msgNumberFlag = true
        this.msgContent = '请填写此number'
        return
      } else {
        this.msgNumberFlag = false
      }
      if (this.cardNumbers.length < 16) {
        this.msgNumberFlag = true
        this.msgContent = '请与所要求的格式保持一致'
        return
      } else {
        this.msgNumberFlag = false
      }
      if (!this.cardName) {
        this.msgNameFlag = true
        this.msgContent = '请填写此name'
        return
      } else {
        this.msgNameFlag = false
      }
      if (!this.cardValidThru) {
        this.msgValidThruFlag = true
        this.msgContent = '请填写此validateThru'
        return
      } else {
        this.msgValidThruFlag = false
      }
      if (this.cardValidThru.length < 4) {
        this.msgValidThruFlag = true
        this.msgContent = '请与所要求的格式保持一致'
        return
      } else {
        this.msgValidThruFlag = false
      }
      if (!this.cardValidate) {
        this.msgValidateFlag = true
        this.msgContent = '请填写此validate'
        return
      } else {
        this.msgValidateFlag = false
      }
      if (this.cardValidate.length < 4) {
        this.msgValidateFlag = true
        this.msgContent = '请与所要求的格式保持一致'
        return
      } else {
        this.msgValidateFlag = false
      }
      this.reportConfirmFlag = true
    },
    handleInputCardNumbers (e) {
      this.cardNumbers = e.target.value.replace(/[^\d]/g, '')
    },
    handleInputCardValidate (e) {
      this.cardValidate = e.target.value.replace(/[^\d]/g, '')
    },
    handleInputCardValidThru (e) {
      this.cardValidThru = e.target.value.replace(/[^\d]/g, '')
    }
  },
  watch: {
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.creditCard
  height: 100%
  width: 100%
  background-color: #fff;
  overflow: hidden
  .rotate-wrapper
    width: 290px;
    height: 242px
    margin 0px auto
    overflow: hidden
    transform:translate3d(0,0,0)
    perspective: 1000px
    .card-content
      position: absolute
      left 0
      top 30px
      width: 290px;
      height: 182px
      background-color: rgb(153, 153, 153);
      border-radius 14.5px
      transform:transition3d(0,0,0)
      transform-style preserve-3d
      transition: transform .2s linear
      &.rotate1-enter-active,&.rotate1-leave-active
        transform rotateY(90deg)
      &.rotate1-enter, &.rotate1-leave-active
        transform: rotateY(90deg)
      .card-icon
        position: absolute
        height:42px
        width 26px
        top:20px
        left:25px
      .card-dot
        position: absolute
        height:30px
        line-height 30px
        left:30px
        top 85px
        font-size 20px
        font-family: Consolas, Courier, monospace
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
        font-family: Consolas, Courier, monospace;
        font-size: 17px;
      .valid-thru
        position: absolute
        height:12px
        line-height 12px
        top:120px
        right: 30px
        font-size 10px
        color: #fff
      .valid-thru-value
        position: absolute
        height:12px
        line-height 12px
        top:141px
        left: 208px
        font-size 16px
        color: #fff
    .card-content-converse
      position: absolute
      left 0
      top 30px
      width: 290px;
      height: 182px
      background-color: rgb(153, 153, 153);
      border-radius 14.5px
      transform:transition3d(0,0,0)
      transform-style preserve-3d
      transition: transform .2s linear
      &.rotate2-enter-active, &.rotate2-leave-active
        transform: rotateY(-90deg)
      &.rotate2-enter, &.rotate2-leave-active
        transform: rotateY(-90deg)
      .blackTip
        position: absolute
        width 100%
        height:40px
        top 20px
        left: 0
        background-color: #000
      .whiteTip
        position: absolute
        width 217px
        height:33px
        top 68px
        left: 16px
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
  & small
    width 400px
    height: 15px
    display: block
    margin 0 auto
    color #000
    font-size 12px
    font-weight: 400
  .container-number, .container-name
    margin 0px auto 5px auto
    width:400px
    height:38px
    .form-card-number, .form-card-name
      width:400px
      height:38px
      // borderB-1px(rgba(0,0,0,.15))
      border 1px solid rgba(0,0,0,.15)
      border-radius 4px
      text-indent 10px
      &:focus
        color: rgb(73, 80, 87)
        background-color: rgb(255, 255, 255)
        border-color: rgb(128, 189, 255)
        outline: 0px
      &::placeholder
        text-indent 10px
  .container-name
    margin 15px auto 5px auto
  .container-valid-cvc
    width:400px
    height:38px
    margin 20px auto 5px auto
    .msg-card-type
      position absolute
    .form-card-date, .form-card-validate
      display: inline-block
      vertical-align top
      border 1px solid rgba(0,0,0,.15)
      border-radius 4px
      text-indent 10px
      width 185px
      height:38px
      &:focus
        color: rgb(73, 80, 87)
        background-color: rgb(255, 255, 255)
        border-color: rgb(128, 189, 255)
        outline: 0px
      &::placeholder
        text-indent 10px
    .form-card-date
      margin-right 20px
  .validThruWrapper
    display: inline-block
    vertical-align: top
    margin-left 750px
    width:200px
    height:38px
  .validateWrapper
    display: inline-block
    vertical-align: top
    margin-left 950px
    width:200px
    height:38px
  .button-pay
    display: block
    width:400px
    height:38px
    margin 20px auto 5px auto
    color: #fff
    background-color: #007bff
    border none
    border-radius 4px
    user-select: none
    font-size 16px
  .cardReportWrapper
    width 100%
    height:150px
    display: flex
    justify-content center
  .cardReport
    /*width:300px*/
    margin-top 10px
    height:150px
    font-size 16px
    color: #212529
    font-family: serif
    line-height: 1.5
</style>
