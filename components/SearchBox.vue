<template>
  <div class="theme-track--header-search" :class="searchActiveClass">
    <div class="search-box">
      <i class="iconfont icon-search"  @click.stop="handleSearch()"></i>
      <input
        ref="input"
        v-model="query"
        @blur="handleLeaveSearch"
        @keyup.enter="go(focusIndex)"
        @keyup.up="onUp"
        @keyup.down="onDown"
        class="search-text"
        aria-label="Search"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
    <ul
      v-show="suggestions.length"
      class="search-suggestion"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus()"
    >
      <li
        v-for="(suggestion, i) in suggestions"
        :key="i"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="suggestion.path" @click.prevent>
          <span class="suggestion-title">{{ suggestion.title || suggestion.path }}</span>
          <span v-if="suggestion.header" class="header">&gt; {{ suggestion.header.title }}</span>
        </a>
      </li>
    </ul>
    <button class="search-btn" @click="handleSearch">
      <i class="iconfont icon-search"></i>
    </button>
  </div>
</template>

<script>
  import { pageNormalize } from "../util"
  export default {
    data () {
      return {
        show: false,
        query: '',
        focusIndex: 0
      }
    },
    computed: {
      searchActiveClass () {
        return this.show ? 'active' : ''
      },
      alignRight () {
        const navCount = (this.$site.themeConfig.nav || []).length
        return navCount <= 2
      },
      suggestions () {
        const query = this.query.trim().toLowerCase()
        if (!query) {
          return []
        }
        const max = 5
        const pages = this.$pagination.all
        const localePath = this.$localePath
        const matches = item => {
          const keywords = this.getKeywords(item);
          return (
            item.title && 
            item.title.toLowerCase().indexOf(query) > -1 ||
            keywords.some(keyword => keyword.indexOf(query) > -1)
          )
        }
        const res = []
        for (let i = 0; i < pages.length; i++) {
          if (res.length >= max) break;
          const p = pages[i]
          // filter out results that do not match current locale
          if (this.getPageLocalePath(p) !== localePath) {
            continue
          }
          if (matches(p)) {
            res.push(p)
          } else if (p.headers) {
            for (let j = 0; j < p.headers.length; j++) {
              if (res.length >= max) break
              const h = p.headers[j]
              if (matches(h)) {
                res.push(
                  Object.assign({}, p, {
                    path: p.path + "#" + h.slug,
                    header: h
                  })
                )
              }
            }
          }
        }
        return res
      }
    },
    methods: {
      handleSearch () {
        this.show = true
        clearTimeout(this.timeoutHidden)
        const input = this.$refs.input
        setTimeout(() => input.focus(), 50)
      },
      handleLeaveSearch () {
        this.timeoutHidden = setTimeout(() => {
          this.show = false
          this.query = ''
        }, 150)
      },
      getKeywords(page) {
        const metaList = (page.frontmatter ? page.frontmatter.meta : []) || []
        let keywords = metaList.filter(meta => meta.name === "keywords")
        keywords = keywords.length && keywords[0].content ? keywords[0].content.split(" ") : []
        return keywords.map(keyword => keyword.toLowerCase())
      },
      getPageLocalePath(page) {
        for (const localePath in this.$site.locales || {}) {
          if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
            return localePath
          }
        }
        return "/"
      },
      onUp() {
        if (this.show) {
          if (this.focusIndex > 0) {
            this.focusIndex--
          } else {
            this.focusIndex = this.suggestions.length - 1
          }
        }
      },
      onDown() {
        if (this.show) {
          if (this.focusIndex < this.suggestions.length - 1) {
            this.focusIndex++;
          } else {
            this.focusIndex = 0
          }
        }
      },
      go(i) {
        this.$router.push(this.suggestions[i].path)
        this.query = ""
        this.focusIndex = 0
      },
      focus(i) {
        this.focusIndex = i
      },
      unfocus() {
        this.focusIndex = -1
      }
    }
  }
</script>

<style lang="stylus">
  $component = '.search-'
  {$theme}
    &header-search
      position relative
      width $baseFontSize
      transition width .2s
      &.active
        width: px2rem(200px)
        {$component}btn
          display none
        {$component}box
          width: px2rem(200px)
          visibility visible
          opacity 1
  {$component}
    &box
      position absolute
      box-sizing border-box
      top (($navbarHeight - px2rem(32px)) / 2)
      right 0
      padding: 0 px2rem(15px) 0 px2rem(30px)
      height: px2rem(30px)
      border 1px solid $accentColor
      width 2rem
      visibility hidden
      opacity 0
      transition all .2s
      border-radius 2rem
      .iconfont
        position absolute
        left px2rem(8px)
        top 50%
        margin-top: -($baseFontSize / 2)
        color $accentColor
    &text
      padding 0
      width 100%
      height 100%
      border none
      outline none
      background transparent
      // height px2rem(30px)
    &btn
      margin (($navbarHeight - px2rem(30px)) / 2) 0 0
      background none
      border none
      padding 0
      cursor pointer
      height px2rem(30px)
      &:focus
        outline none
      &:hover
        color $accentColor
    &suggestion
      position absolute
      top 100%
      left 0
      margin 0
      padding 0.4rem
      width 100%
      list-style none
      background #fff;
      // box-shadow 0 1px 1px rgba(0,0,0,0.25)
      border: 1px solid rgba(0,0,0,0.1);
      border-radius 3px
      &.align-right
        left auto
        right 0
      > li
        padding .25em .5em
        line-height 1.4
        border-radius 3px
        &.focused
          background-color lighten($accentColor, 95%)
        > a
          .suggestion-title
            font-weight 600
          .header
            marign-left 0.25em
            font-size 0.9em
  @media (max-width: $MQNarrow)
    .theme-track--header-search.active .search-box
    .theme-track--header-search.active
      width px2rem(150px)
</style>