<template>
  <div class="theme-track--date">
    {{ year }}.{{ month }}
    <b>{{ day }}</b>
  </div>
</template>

<script>
  const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  export default {
    props: ['date'],
    computed: {
      year () {
        return this.date.substr(0, 4)
      },
      month () {
        return Months[this.date.substr(5, 2) - 1]
      },
      day () {
        return this.date.substr(8, 2)
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &date
      display inline-block
      b
        display block
        width 100%
        text-align center
        font-size px2rem(24px)
</style>