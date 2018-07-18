<template>
  <div class='creditCard'>
    <v-card :showFlag="showFlag"
            :cardNumbers="cardNumbers"
            :cardName="cardName"
            :cardValidate="cardValidate"
            :cardValidThru="cardValidThru"
    ></v-card>
    <form class="form-wrapper">
      <div class='container-number'>
        <label for="number"></label>
        <input placeholder='Card Number' class='form-card-number'
               @input="handleInputCardNumbers"
               maxlength='19'
               @focus="focusCardNumbersFlag = !focusCardNumbersFlag"
               @blur="focusCardNumbersFlag = !focusCardNumbersFlag"
               v-model='cardNumbers'
               @click="showFlag = true"
        >
      </div>
      <v-alertMsg :msgContent="msgContent" v-show="msgNumberFlag"></v-alertMsg>
      <span class="card-num-des">E.g.: 49..., 51..., 36..., 37...</span>
      <div class='container-name'>
        <label for="name"></label>
        <input type='text' placeholder='Name' class='form-card-name'
               @click="showFlag = true"
               v-model="cardName"
               autocomplete="on"
               @focus="focusCardNameFlag = !focusCardNameFlag"
               @blur="focusCardNameFlag = !focusCardNameFlag"
        >
      </div>
      <v-alertMsg :msgContent="msgContent" v-show="msgNameFlag" class="msgName"></v-alertMsg>
      <div class='container-valid-cvc'>
        <label for="Valid"></label>
        <input type='text' placeholder='Valid Thru' class='form-card-date'
               @click="showFlag = true"
               maxlength='5'
               v-model="cardValidThru"
               @input="handleInputCardValidThru"
               @focus="focusCardValidateFlag = !focusCardValidateFlag"
               @blur="focusCardValidateFlag = !focusCardValidateFlag">
        <label for="Validate"></label>
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
    </form>
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
export default {
  data () {
    return {
      showFlag: true,
      reportConfirmFlag: false,
      msgNumberFlag: false,
      msgNameFlag: false,
      msgValidateFlag: false,
      msgValidThruFlag: false,
      focusCardNumbersFlag: false,
      focusCardNameFlag: false,
      focusCardValidateFlag: false,
      cardNumbers: '',
      cardValidate: '',
      cardName: '',
      cardValidThru: '',
      msgContent: ''
    }
  },
  components: {
    'v-alertMsg': resolve => require(['components/alertMsg.vue'], resolve),
    'v-card': resolve => require(['components/cardContent.vue'], resolve)
  },
  methods: {
    submit () {
      let that = this
      if (!this.cardNumbers) {
        this.msgNumberFlag = true
        this.msgContent = '请填写此字段'
        setTimeout(() => {
          that.msgNumberFlag = false
        }, 1000)
        return
      } else if (this.cardNumbers.length < 19) {
        this.msgNumberFlag = true
        this.msgContent = '请与所要求的格式保持一致'
        setTimeout(() => {
          that.msgNumberFlag = false
        }, 1000)
        return
      } else if (!this.cardName) {
        this.msgNameFlag = true
        this.msgContent = '请填写此字段'
        setTimeout(() => {
          that.msgNameFlag = false
        }, 1000)
        return
      } else if (!this.cardValidThru) {
        this.msgValidThruFlag = true
        this.msgContent = '请填写此字段'
        setTimeout(() => {
          that.msgValidThruFlag = false
        }, 1000)
        return
      } else if (this.cardValidThru.length < 5) {
        this.msgValidThruFlag = true
        this.msgContent = '请与所要求的格式保持一致'
        setTimeout(() => {
          that.msgValidThruFlag = false
        }, 1000)
        return
      } else if (!this.cardValidate) {
        this.msgValidateFlag = true
        this.msgContent = '请填写此字段'
        setTimeout(() => {
          that.msgValidateFlag = false
        }, 1000)
        return
      } else if (this.cardValidate.length < 4) {
        this.msgValidateFlag = true
        this.msgContent = '请与所要求的格式保持一致'
        setTimeout(() => {
          that.msgValidateFlag = false
        }, 1000)
        return
      } else {
        this.msgValidateFlag = false
      }
      this.reportConfirmFlag = true
    },
    handleInputCardNumbers (e) {
      this.cardNumbers = e.target.value.replace(/[^\d]/g, '').replace(/(\S{4})(?=\S)/g, '$1 ')
    },
    handleInputCardValidate (e) {
      this.cardValidate = e.target.value.replace(/[^\d]/g, '').replace(/(\S{4})(?=\S)/g, '$1 ')
    },
    handleInputCardValidThru (e) {
      this.cardValidThru = e.target.value.replace(/[^\d]/g, '').replace(/(\S{2})(?=\S)/g, '$1/')
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .creditCard
    position: relative
    padding-top 30px
    height: 100%
    width: 100%
    background-color: #fff
    .form-wrapper
      position: absolute
      top 245px
      left:740px
      width:400px
      .card-num-des
        display: block
        position: absolute
        top 45px
        left: 0
        width 400px
        height: 15px
        display: block
        color #000
        font-size 12px
        font-weight: 400
      .container-number, .container-name
        position: absolute
        top: 0
        left 0
        width:400px
        height:38px
        .form-card-number, .form-card-name
          width:400px
          height:38px
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
        top 80px
      .container-valid-cvc
        position: absolute
        top 136px
        left: 0
        width:400px
        height:38px
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
      .msgName
        margin 132px auto
      .validThruWrapper
        position: absolute
        left 0px
        top 134px
        display: inline-block
        vertical-align: top
        width:200px
        height:38px
      .validateWrapper
        position: absolute
        left 200px
        top 134px
        display: inline-block
        vertical-align: top
        width:200px
        height:38px
      .button-pay
        position: absolute
        width:400px
        height:38px
        top 190px
        left: 0px
        color: #fff
        background-color: #007bff
        border none
        border-radius 4px
        user-select: none
        font-size 16px
    .cardReportWrapper
      position absolute
      top: 480px
      width: 100%;
      height:150px
      display: flex
      justify-content center
    .cardReport
      margin-top 10px
      height:150px
      font-size 16px
      color: #212529
      font-family: serif
      line-height: 1.5
</style>
