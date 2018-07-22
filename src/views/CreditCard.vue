<template>
  <div class='creditCard'>
    <v-card :showFlag="showFlag"
            :cardNumbers="cardNumbers"
            :cardName="cardName"
            :cardValidate="cardValidate"
            :cardValidThru="cardValidThru"
            :focusNum="focusNum"></v-card>
    <form class="form-wrapper">
      <div class="container-number form-group" :class="{ 'form-group--error': $v.cardNumbers.$error }">
        <label for="number" class="form__label"></label>
        <input placeholder='Card Number' class='form-card-number form__input'
               @input="handleInputCardNumbers, $v.cardNumbers.$touch()"
               maxlength='19'
               v-model.trim="cardNumbers"
               @click="showFlag = true, focusNum = 1">
        <div class="error" v-if="!$v.cardNumbers.required">Field is required</div>
        <div class="error" v-if="!$v.cardNumbers.minLength">CardNumbers must have at least {{$v.cardNumbers.$params.minLength.min - 3}} letters.</div>
      </div>
      <span class="card-num-des">E.g.: 49..., 51..., 36..., 37...</span>
      <div class='container-name form-group' :class="{ 'form-group--error': $v.cardName.$error }">
        <label for="name" class="form__label"></label>
        <input placeholder='Name' class='form-card-name form__input'
               @click="showFlag = true, focusNum = 2"
               v-model.trim="cardName"
               @input="$v.cardName.$touch()"
               autocomplete="on">
      </div>
      <div class="error" v-if="!$v.cardName.required">Field is required</div>
      <div class="container-valid-cvc form-group" :class="{ 'form-group--error': $v.cardValidThru.$error }">
        <label for="Valid"></label>
        <input type='text' placeholder='Valid Thru' class='form-card-date'
               @click="showFlag = true, focusNum = 3"
               maxlength='5'
               v-model="cardValidThru"
               @input="handleInputCardValidThru, $v.cardValidThru.$touch()">
        <div class="error-valid" v-if="!$v.cardValidThru.required">Field is required</div>
        <div class="error-valid" v-if="!$v.cardValidThru.minLength">cardValidThru must have at least {{$v.cardValidThru.$params.minLength.min - 1}} letters.</div>
      </div>
      <div class="container-validate-cvc form-group" :class="{ 'form-group--error': $v.cardValidate.$error }">
        <label for="Validate"></label>
        <input type='text' placeholder='CVC' class='form-card-validate'
               @keyup.9="showFlag = false"
               @click="showFlag = false"
               v-model="cardValidate"
               maxlength='4'
               @input="handleInputCardValidate, $v.cardValidate.$touch()">
        <div class="error-validate" v-if="!$v.cardValidate.required">Field is required</div>
        <div class="error-validate" v-if="!$v.cardValidate.minLength">cardValidate must have at least {{$v.cardValidate.$params.minLength.min}} letters.</div>
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      focusNum: 0,
      showFlag: true,
      reportConfirmFlag: false,
      cardNumbers: '',
      cardValidate: '',
      cardName: '',
      cardValidThru: ''
    }
  },
  validations: {
    cardNumbers: {
      required,
      minLength: minLength(19)
    },
    cardName: {
      required
    },
    cardValidThru: {
      required,
      minLength: minLength(5)
    },
    cardValidate: {
      required,
      minLength: minLength(4)
    }
  },
  components: {
    'v-card': () => import('components/cardContent.vue')
  },
  methods: {
    submit() {
      this.reportConfirmFlag = true
    },
    handleInputCardNumbers(e) {
      this.cardNumbers = e.target.value
        .replace(/[^\d]/g, '')
        .replace(/(\S{4})(?=\S)/g, '$1 ')
    },
    handleInputCardValidate(e) {
      this.cardValidate = e.target.value
        .replace(/[^\d]/g, '')
        .replace(/(\S{4})(?=\S)/g, '$1 ')
    },
    handleInputCardValidThru(e) {
      this.cardValidThru = e.target.value
        .replace(/[^\d]/g, '')
        .replace(/(\S{2})(?=\S)/g, '$1/')
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.creditCard
  position relative
  padding-top 30px
  height 100%
  width 100%
  background-color #fff
  .form-wrapper
    position relative
    margin 30px auto
    width 400px
    .card-num-des
      display block
      margin-top 5px
      color #000
      font-size 12px
      font-weight 400
    .container-number, .container-name
      min-height 40px
      .form-card-number, .form-card-name
        width 400px
        height 38px
        border 1px solid rgba(0, 0, 0, 0.15)
        border-radius 4px
        text-indent 10px
        &:focus
          color rgb(73, 80, 87)
          background-color rgb(255, 255, 255)
          border-color rgb(128, 189, 255)
          outline 0px
        &::placeholder
          text-indent 10px
    .container-name
      margin-top 13px
    .error
      margin-top 5px
      color #f57f6c
      font-size 14px
    .container-valid-cvc, .container-validate-cvc
      min-height 80px
      box-sizing border-box
      display inline-block
      vertical-align top
      margin-top 8px
      .form-card-date, .form-card-validate
        margin-top 8px
        border 1px solid rgba(0, 0, 0, 0.15)
        border-radius 4px
        text-indent 10px
        width 185px
        height 38px
        &:focus
          color rgb(73, 80, 87)
          background-color rgb(255, 255, 255)
          border-color rgb(128, 189, 255)
          outline 0px
        &::placeholder
          text-indent 10px
      .form-card-date
        margin-right 20px
      .error-validate, .error-valid
        width 187px
        color #f57f6c
        font-size 14px
    .button-pay
      width 400px
      height 38px
      color #fff
      background-color #007bff
      border none
      border-radius 4px
      user-select none
      font-size 16px
  .cardReportWrapper
    position absolute
    top 480px
    width 100%
    height 150px
    display flex
    justify-content center
  .cardReport
    margin-top 10px
    height 150px
    font-size 16px
    color #212529
    font-family serif
    line-height 1.5
</style>
