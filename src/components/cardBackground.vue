<template>
<div class="cardBackground" :class="{active: isActive}" :style="{background: bgColor}">
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    bgColor: {
      type: String
    }
  },
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.cardBackground
  position: absolute
  height: 200%
  left: -173%
  top: -60%
  transform: rotate(25deg)
  width: 150%
  background-color: #222
  z-index: 50
  &.active
    left: -22%
    transition: all 0.5s ease-out
</style>
