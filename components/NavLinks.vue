<template>
  <nav class="theme-track--nav-links">
    <ul :class="{ active: showNavMask }">
      <li v-for="(nav, index) in navList" :key="index">
        <router-link 
          :to="ensureExt(nav.link)" 
          v-if="!isExternal(nav.link)"
          :class="{ active: active(nav.link) }"
        >{{ nav.text }}</router-link>
        <a
          v-else 
          :href="ensureExt(nav.link)"
          :target="isMailto(nav.link) || nav.inherent ? null : '_blank'"
          :rel="isMailto(nav.link) ? null : 'noopener noreferrer'"
        >
          {{ nav.text }}
        </a>
      </li>
    </ul>
    <SidebarButton ref="button" :active="showNavMask" @toggle-nav="toggleNav" />
    <div v-show="showNavMask" class="theme-track--nav-mask" @click.stop="handleHideNavlist"></div>
  </nav>
</template>

<script>
  import { isExternal, isMailto, isActive, resolveNavLinkItem, ensureExt } from '../util'
  export default {
    computed: {
      nav () {
        return this.$site.themeConfig.nav || []
      },
      navList () {
        return this.nav.map(link => {
          return Object.assign(resolveNavLinkItem(link), {
            items: (link.items || []).map(resolveNavLinkItem)
          })
        })
      }
    },
    data: () => ({
      showNavMask: false,
      swiperX: 0,
      swiperY: 0
    }),
    methods: {
      isExternal,
      isMailto,
      isActive,
      ensureExt,
      active (link) {
        const { pageRoot = '/' } = this.$themeConfig
        const path = String(this.$page.path).replace(/\.(html|md)#?(.*)/g, '')
        return this.$page.path === link || path === link || (link === pageRoot && ~this.$page.path.indexOf('/page')) || (link !== '/' && path.startsWith(link) )
      },
      toggleNav () {
        this.showNavMask = !this.showNavMask
      },
      handleHideNavlist () {
        this.showNavMask = false
      },
      touchstart (e) {
        const touches = e.changedTouches
        if (touches && touches[0]) {
          this.swiperX = touches[0].pageX
          this.swiperY = touches[0].pageY
        } else {
          this.swiperX = 0
          this.swiperY = 0
        }
      },
      touchend (e) {
        const touches = e.changedTouches
        if (touches && touches[0] && this.swiperX !== touches[0].pageX) {
          window.innerWidth <= 960 && Math.abs(this.swiperY - touches[0].pageY) < 50 && (this.showNavMask = this.swiperX + 100 < touches[0].pageX)
        }
      }
    },
    mounted() {
      if (typeof window !== 'undefined') {
        document.addEventListener('touchstart', this.touchstart)
        document.addEventListener('touchend', this.touchend)
      }
    },
    destroyed() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('touchstart', this.touchstart)
        document.removeEventListener('touchend', this.touchend)
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &nav-links
      margin (($navbarHeight - px2rem(30px)) / 2) 0 0
      > ul
        list-style none
        margin 0
        padding 0
        > li
          display inline-block
          margin 0 px2rem(20px)
          font-size px2rem(12px)
          > a
            position relative
            display block
            color $textColor
            transition all .2s
            &:hover
            &.active
              color $accentColor
              &::before
              &::after
                opacity 1
                visibility visible
                border-color $accentColor
                transform scale(1)
            &::before
            &::after
              position absolute
              content ''
              width 5px
              height 5px
              border-style solid
              border-color $textColor
              visibility hidden
              opacity 0
              transition all .3s
              transform scale(1.5)
            &::before
              top -3px
              left -10px
              border-width 1px 0 0 1px
            &::after
              bottom -3px
              right: -10px
              border-width 0 1px 1px 0
    &nav-mask
      position fixed
      top $navbarHeight
      bottom 0
      left 0
      right 0
      z-index 10
      width 100%
      height "calc(100vh - %s)" % $navbarHeight
      background rgba(0, 0, 0, .1)

  @media (max-width: $MQNarrow)
    .theme-track--nav-links
      > ul
        position absolute
        top 100%
        left 0
        z-index 50
        margin 0
        padding 1em 0
        width 40%
        height "calc(100vh - %s)" % $navbarHeight
        background #fff
        transform translate3d(-100%, 0, 0)
        transition all .2s ease-in-out
        &.active
          transform translate3d(0, 0, 0)
        > li
          display block
          padding 1em 0
          > a
            display block
            text-align center
</style>