<template>
  <router-link :to="link" class="theme-track--tag-node">
    {{ item }}
  </router-link>
</template>

<script>
  export default {
    props: ['item', 'type'],
    computed: {
      link () {
        return `/${this.type}/${this.item}.html`
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &tag-node
      position relative
      display inline-block
      padding .1rem .5rem
      font-size px2rem(12px)
      color $accentColor
      &:hover
        color $accentColor
      & + &
        &::before
          content '/'
          position relative
          left -0.5rem
</style>