<template>
  <div class="msg-card-type">
    <img class="msg-risk-img" src="../../static/risk.png" alt="risk">
    <div class="msg-content">{{msgContent}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    msgContent: {
      type: String
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .msg-card-type
    margin 55px auto
    padding: 5px
    width:220px
    height:30px
    border:1px solid #f99
    position:relative
    background-color:#FFF
    border-radius:5px
    z-index: 30
    .msg-risk-img
      display: inline-block
      vertical-align: top
      margin-top 3px
      width:24px
      height:24px
    .msg-content
      display: inline-block
      margin-left 5px
      vertical-align: top
      font-size 14px
      height 30px
      line-height: 30px
      color: #000
  .msg-card-type:before,.msg-card-type:after
    content:""
    display:block
    border-width:15px
    position:absolute
    top:-30px
    left:100px
    border-style:solid dashed dashed solid
    border-color:transparent  transparent #f99 transparent
    font-size:0
    line-height:0
  .msg-card-type:after
    top:-27px
    border-color: transparent transparent #FFF transparent
</style>
