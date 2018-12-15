<template>
  <LayoutContainer>
    <ContentWrapper>
      <div class="theme-track--404">
        <img :src="poster" class="theme-track--page-poster" />
        <div class="theme-track--404-cover" @mousemove="moveBackground($event)" :style="moveStyle">
          <h3>o0OPs~</h3>
          <h1>404 !</h1>
        </div>
        <router-link class="action-button" to="/">返回首页</router-link>
      </div>
    </ContentWrapper>
  </LayoutContainer>
</template>

<style lang="stylus">
  {$theme}
    &404
      position relative
      > img
        visibility hidden
      &-cover
        height 100%
        width 100%
        background-size 100% auto
        background-position 50% 50%
        text-align center
        line-height 200px
        position: absolute
        top 0
        left 0
        padding-top 2rem
        -webkit-background-clip: text
        color transparent
        h3
          font-size 3rem
        h1
          margin-top 0
          font-size 10rem
      .action-button
        position absolute
        bottom 20%
        left 50%
        transform translate3d(-50%, -50%, 0)
        display inline-block
        font-size 1.2rem
        color #fff
        background-color $accentColor
        padding 0.8rem 1.6rem
        border-radius 4px
        transition background-color .1s ease
        box-sizing border-box
        border-bottom 1px solid darken($accentColor, 10%)
        &:hover
          background-color lighten($accentColor, 10%)
</style>

<script>
  import { isExternal } from '../util'
  import poster from '../assets/images/404.jpg'

  export default {
    computed: {
      poster () {
        return poster
      }
    },
    data: () =>({
      moveStyle: {
        'background-image': `url(${poster})`,
        'background-position': '50% 50%'
      }
    }),
    methods: {
      moveBackground (e) {
        const el = e.target
        const left = el.offsetWidth / 2 - document.body.clientWidth / 2 - e.pageX
        const top = el.offsetHeight / 2 - document.body.clientHeight / 2 - e.pageY
        if (typeof window !== 'undefined') {
          requestAnimationFrame(() => {
            this.moveStyle['background-position'] = `${left / 10}px ${top / 10}px`
          })
        }
      }
    }
  }
</script>
