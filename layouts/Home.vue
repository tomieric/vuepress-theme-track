<template>
  <LayoutContainer ref="container" class="home-container" :class="{ 'show-nav-bar': showNavBar }">
    <NavBar :logo="logo" ref="header" class="reverse" />
    <div class="home">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        class="hero-img"
        alt="hero"
      >
      <vue-particles
        v-if="showParticles"
        class="hero-img-mask"
        color="#ffffff"
        :particleOpacity="0.3"
        :particlesNumber="70"
        shapeType="star"
        :particleSize="3"
        linesColor="#ffffff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.1"
        :linesDistance="180"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
      <div class="hero">
        <h1 v-if="data.heroText">{{ data.heroText || $title || 'Track' }}</h1>
        <p class="description" v-if="data.tagline || $description">
          {{ data.tagline || $description }}
        </p>

        <p
          class="action"
          v-if="data.actionText && data.actionLink"
        >
          <NavLink
            class="action-button"
            :item="actionLink"
          />
        </p>
      </div>
    </div>

    <ContentWrapper>
      <tabs
        v-if="data.features && data.features.length" 
        :options="{ useUrlFragment: false }"
      >
        <tab
          v-for="(feature, index) in data.features"
          :key="index"
          :name="feature.title"
        >
          <img v-if="feature.poster" :src="resolveUrl(feature.poster)" class="feature-poster" />
          <div class="feature-content" v-html="feature.details"></div>
        </tab>
      </tabs>
      <Content class="custom" />
    </ContentWrapper>

  </LayoutContainer>
</template>

<script>
import Vue from 'vue'
import { debounce, isExternal } from '../util'
let checkScrollHeight = () => {}


export default {
  data () {
    return {
      showNavBar: false,
      showParticles: false
    }
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },
    logo () {
      return this.$site.themeConfig.logoInverse || this.$site.themeConfig.logo
    }
  },
  methods: {
    scrollPage () {
      const $navbar = this.$refs.container.$refs.header.$refs.navbar
      const scrollTop = document.documentElement.scrollTop
      this.showNavBar = scrollTop >= $navbar.offsetHeight
    },
    handleTabChange (e) {
      e.preventDefault();
      return false
    },
    resolveUrl (url) {
      return isExternal(url) ? url : this.$withBase(url)
    }
  },
  mounted() {
    checkScrollHeight = debounce(() => this.scrollPage(), 100)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', checkScrollHeight)
    }

    // 动态引入
    import('vue-particles').then(module => {
      Vue.use(module.default)
      this.$nextTick(() => (this.showParticles = true))
    })
  },
  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', checkScrollHeight)
    }
  },
}
</script>

<style lang="stylus">
$headerColor=#fff
.home-container
  .theme-track--content-wrapper
    min-height auto
  &.show-nav-bar
    .theme-track--header
      .theme-track--navbar
        transform translate3d(0, 0, 0)
        opacity 1
  .theme-track--header
    height 0
    .theme-track--navbar
      z-index 110
      transform translate3d(0, -100%, 0)
      opacity 0
      transition all 0.15s cubic-bezier(0.29, 0.79, 0.49, 0.71) 0.05s
    &.reverse
      height 0
      color $headerColor
      .theme-track--navbar
        position absolute
        background rgba(0, 0, 0, 0)
        border-bottom none
        transition all .2s
        transform translate3d(0, 0, 0)
        opacity 1
        z-index 100
        &.theme-track--logo
          color $headerColor
        .theme-track--nav-links
          a
            &.active
            color $headerColor
            &:hover
              color lighten($headerColor, 5%)
            &::before
            &::after
                border-color $headerColor
            &.active
            &:hover
              &::before
              &::after
                border-color $headerColor
      .theme-track--nav-links > ul > li > a
      .theme-track--nav-links > ul > li > a.active
        color $headerColor
        &:hover
          color: lighten($headerColor, 5%)
      .theme-track--header-github > a
        color $headerColor
        &:hover
          color lighten($headerColor, 5%)
      .search-box
        border-color $headerColor
        .iconfont
          color $headerColor
      .search-text
        color $headerColor
      .search-btn
        color $headerColor
        &:hover
          color lighten($headerColor, 5%)
  .home
    position relative
    max-width none
    padding 0
    margin 0
    .hero-img
      display block
      width 100%
      height auto
      background $darkBgColor
    .hero-img-mask
      position absolute
      // top $navbarHeight
      top 0
      left 0
      width 100%
      overflow hidden
    .hero
      display flex
      align-items center
      flex-direction column
      justify-content center
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      padding-top $navbarHeight
      text-align center
      color $headerColor
      h1
        font-size 3rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.6rem
        line-height 1.3
        color $headerColor
      .action-button
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
  .feature-poster
    display block
    max-width 40%
    height auto
    margin-right px2rem(30px)
    opacity 0
    transform translate3d(-10%, 0, 0)
    transition transform .3s ease-in-out, opacity .5s ease-in-out
  .feature-content
    color $viceTextColor
    opacity 0
    transform translate3d(-5%, 0, 0)
    transition transform .3s ease-in-out .2s, opacity .5s ease-in-out .2s
  .tabs-component-panel
    overflow hidden
    &.active
      .feature-poster
      .feature-content
        opacity 1
        transform translate3d(0, 0, 0)
@media (max-width: $MQNarrow)
  .home-container .theme-track--header.reverse
    display none
  .home-container .theme-track--header .theme-track--navbar
  .home-container.show-nav-bar .theme-track--header .theme-track--navbar
    transform translate3d(0, 0, 0)
    opacity 1
@media (max-width: $MQMobile)
  .home-container
    .theme-track--header
      &.reverse
        .theme-track--nav-links > ul
          width 100%
        .theme-track--nav-links > ul > li > a
        .theme-track--nav-links > ul > li > a.active
          color $viceTextColor
          &::before
          &::after
              border-color $viceTextColor!important

    .home .hero h1
    .home .hero .description
    .home .hero .action
      margin 0.5rem 0
    .home .hero h1
      font-size 1.5rem
    .home .hero .description
      font-size 1.2rem
    .home .hero .action-button
      font-size 1rem
      padding 0.5rem 1.2rem
    .tabs-component
      margin 2em 0 0
    .tabs-component-panels
      padding 2em 0 0
    .tabs-component-panel
      padding 0
      flex-direction column
      div
        width 100%
    .feature-poster
      flex 1
      max-width 100%
      margin-right 0
</style>