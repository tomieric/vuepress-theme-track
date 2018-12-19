<template>
  <LayoutContainer>
    <ContentWrapper>
      <img
        :src="poster"
        v-if="$page.frontmatter.poster"
        class="theme-track--content-poster"
      />
      <p v-if="$page.frontmatter.poster" class="theme-track--content-date">
        <span>Publish: {{ $page.frontmatter.date }}</span>
        <span
          v-if="$page.tags && $page.tags.length"
        >
          Tags:
          <router-link
            v-for="(tag, tagIdx) in $page.tags"
            :key="tagIdx"
            :to="toTagLink(tag)"
            class="tag"
          >
            {{ tag }}
          </router-link> 
        </span>
      </p>
      <div class="theme-track--content">
        <Sidebar
          :items="sidebarItems"
          v-if="!isFull"
        >
          <slot
            name="sidebar-top"
            slot="top"
          />
          <slot
            name="sidebar-bottom"
            slot="bottom"
          />
        </Sidebar>
        <div class="theme-track--content-main" :class="{ 'full': isFull }">
          <div class="theme-track--content-meta">
            <h1 v-if="$page.frontmatter.showTitle !== false">{{ $page.frontmatter.title }}</h1>
            <GithubCard
              :author="$page.frontmatter.author"
              :size="100"
              :width="300"
              v-if="showAuthor"
            >
              <p class="theme-track--content-meta-author"><i class="iconfont icon-home"></i> {{ $page.frontmatter.author || 'Anonymous' }}</p>
            </GithubCard>

            <p
              v-if="!$page.frontmatter.poster"
              class="theme-track--content-date"
            >
              <span>Publish: {{ $page.frontmatter.date }}</span>
              <span v-if="$page.tags && $page.tags.length">
                Tags:
                <router-link
                  v-for="(tag, tagIdx) in $page.tags"
                  :key="tagIdx"
                  :to="toTagLink(tag)"
                >
                  {{ tag }}
                </router-link> 
              </span>
            </p>
          </div>
          <Content :custom="false"  :class="{ weekly: isWeekly }" />
          <p
            class="theme-track--content-page"
          >
            <router-link
              v-if="prev"
              :to="prev.path"
              class="prev"
            >
              <i class="iconfont icon-prev"></i>
              {{ prev.title || prev.path }}
            </router-link>
            <router-link
              v-if="next"
              :to="next.path"
              class="next"
            >
              {{ next.title || next.path }}
              <i class="iconfont icon-next"></i>
            </router-link>
          </p>
          <div id="comment-container" v-if="isComment">
            <Comment />
          </div>
        </div>
      </div>
    </ContentWrapper>
  </LayoutContainer>
</template>

<script>
  import Comment from '../comment'
  import Sidebar from '../components/Sidebar'
  import {
    resolvePage,
    normalize,
    endingSlashRE,
    pageNormalize,
    resolveSidebarItems,
    isExternal
  } from '../util'

  function resolvePrev(name, pages) {
    return find(name, pages, -1)
  }
  function resolveNext(name, pages) {
    return find(name, pages, 1)
  }
  function find(name, pages, offset) {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].key === name) {
        if (offset < 0 && i === 0) return false
        if (offset > 0 && i === pages.length - 1) return false
        const page = pages[i + offset]
        return page.path === '/' ? false : page
      }
    }
  }


  export default {
    data () {
      return {}
    },
    components: {
      Comment,
      Sidebar
    },
    computed: {
      isFull () {
        return this.$page.frontmatter.sidebar === false
      },
      isComment() {
        return this.$site.themeConfig.comment && (this.$page.type === 'post' || this.$page.frontmatter.type === 'weekly')
      },
      isWeekly () {
        return this.$page.frontmatter.type === 'weekly'
      },
      pageHiddenAuthor () {
        return this.$page.frontmatter.showAuthor === false
      },
      showAuthor () {
        return this.pageHiddenAuthor ? !1 : this.$themeConfig.showAuthor
      },
      prev() {
        const prev = this.$page.frontmatter.prev
        if (!this.$pagination) return
        if (prev === false) {
          return
        } else if (prev) {
          return resolvePage(this.$pagination.all, prev, this.$route.name)
        } else {
          return resolvePrev(this.$route.name, this.$pagination.all)
        }
      },
      next() {
        const next = this.$page.frontmatter.next
        if (!this.$pagination) return
        if (next === false) {
          return
        } else if (next) {
          return resolvePage(this.$pagination.all, next, this.$route.name)
        } else {
          return resolveNext(this.$route.name, this.$pagination.all)
        }
      },
      githubAvatar () {
        return this.$page.frontmatter.author ? 'https://github.com/'+ this.$page.frontmatter.author +'.png?size=100' : ''
      },
      authorHomePage () {
        return this.$page.frontmatter.homepage ? this.$page.frontmatter.homepage : '//github.com/' + this.$page.frontmatter.author
      },
      sidebarItems () {
        return resolveSidebarItems(
          this.$page,
          this.$page.regularPath,
          this.$site,
          this.$localePath
        )
      },
      poster () {
        return isExternal(this.$page.frontmatter.poster) ? this.$page.frontmatter.poster : this.$withBase(this.$page.frontmatter.poster)
      }
    },
    methods: {
      toTagLink (t) {
        return '/tags/' + t
      }
    }
  }
</script>

<style lang="stylus">
  $content = 'content'
  {$theme}
    &{$content}
      &-main
        margin-left 12rem
        border-left 1px solid $borderColor
        &.full
          margin-left 0
          border-left 0
      &-poster
        display block
        width 100%
        height auto
        background $borderColor
      &-date
        text-align right
        font-size px2rem(12px)
        color $viceTextColor
        > span
          margin-left 2em
        .tag
          margin-left 0.5em
          & + .tag::before
            content '/'
            position relative
            left -0.25em 
      &-meta
        text-align center
        > h1
          margin px2rem(30px) 0
          font-weight 200
          font-size px2rem(30px)
        img
          display block
          width 100px
          height 100px
          margin 0 auto px2rem(10px)
          border-radius 100%
          border 1px solid lighten($borderColor, 20%)
          background $darkBgColor
          transition all .2s
          &:hover
            opacity 0.8
        &-author
        > a
          font-size px2rem(14px)
          color $viceTextColor
          font-weight 200
          &:hover
            color $accentColor
        .theme-track--content-date
          text-align center
      &-page
        padding 0 2.5rem
        min-height 1.8em
        .prev
        .next
          // color lighten($viceTextColor, 20%)
          color $viceTextColor
          &:hover
            color $accentColor
        .next
          float right
  #comment-container 
    color $accentColor
    max-width $contentWidth
    margin px2rem(20px) auto px2rem(50px)
    padding 2rem 2.5rem
  @media (max-width: $MQMobile)
    .theme-track--content-main
      margin-left 0
      border none
  .content.weekly
    h2
      border-bottom-style dotted
    hr
      border-top-style dotted
</style>