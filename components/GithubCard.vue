<template>
  <div
    class="theme-track--github-card"
  >
    <span
      @mouseenter="togglePopOver(true)"
      @mouseleave="togglePopOver(false)"
    >
      <img
        :src="authorAvatar"
      />
    </span>
    <slot />
    <pop-over v-model="cardVisible" :user="author" :top="size" :width="width" @mouseenter.native="togglePopOver(true)"
      @mouseleave.native="togglePopOver(false)"  :closeDelay="300" />
  </div>
</template>

<script>
  import PopOver from './PopOver'
  let showTimer = null
  export default {
    props: {
      author: {
        type: String,
        default: 'kuaizi-co'
      },
      size: {
        type: Number,
        default: 50
      },
      width: {
        type: Number,
        default: 200
      }
    },
    components: {
      PopOver
    },
    data () {
      return {
        cardVisible: false
      }
    },
    methods: {
      togglePopOver (visible) {
        clearTimeout(showTimer)
        visible ? (this.cardVisible = visible) : (showTimer = setTimeout(() => this.cardVisible = visible, 300))
      }
    },
    computed: {
      authorAvatar () {
        return 'https://github.com/'+ (this.author || 'Kuaizi-co') +'.png?size=' + (this.size || 50)
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &github-card
      position relative
      display inline-block
</style>