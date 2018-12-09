<template>
  <div class="theme-track--article">
    <GithubCard
      :author="post.frontmatter.author"
      class="theme-track--article-author"
      v-if="$themeConfig.showAuthor"
    >
      <p>{{ post.frontmatter.author || 'Anonymous' }}</p>
    </GithubCard>
    <div class="theme-track--article-excerpt" :class="{ 'full' : !$themeConfig.showAuthor}">
      <router-link
        v-if="post.frontmatter.poster"
        :to="post.path"
      >
        <img
          :src="poster"
          class="poster"
        />
      </router-link>
      <h2><router-link :to="post.path">{{ post.title }}</router-link></h2>
      <div class="content custom" v-html="post.excerpt"></div>
      <div class="theme-track--article-tag">
        <span v-if="post.tags">
          Tags:
          <TagNode
            v-for="(tag, tagIdx) in post.tags"
            :key="tagIdx"
            :item="tag"
            type="tag"
          />
        </span>
        <span v-if="post.categories">
          分类:
          <TagNode
            v-for="(category, catIdx) in post.categories"
            :key="catIdx"
            :item="category"
            type="category"
          />
        </span>
      </div>
    </div>
    <div class="theme-track--article-meta">
      <Date :date="date" />
    </div>
  </div>
</template>

<script>
  import { isExternal } from '../util'
  export default {
    props:{
      post: {
        type: Object,
        required: true
      }
    },
    computed: {
      authorAvatar () {
        return 'https://github.com/'+ (this.post.frontmatter.author || 'Kuaizi-co') +'.png?size=50'
      },
      date () {
        return this.post.frontmatter.date.split(' ')[0]
      },
      poster () {
        return isExternal(this.post.frontmatter.poster) ? this.post.frontmatter.poster : this.$withBase(this.post.frontmatter.poster)
      }
    }
  }
</script>

<style lang="stylus">
  {$theme}
    &article
      display flex
      &-author
        width px2rem(100px)
        text-align center
        font-size px2rem(14px)
        color $viceTextColor
        img
          display block
          margin 0 auto
          width 50px
          height 50px
          border-radius 100%
          border 1px solid lighten($borderColor, 20%)
          background $darkBgColor
        > p
          margin 0.5em 0 0
      &-excerpt
        flex 1
        padding 0 px2rem(40px) 0 px2rem(80px)
        word-break break-all
        &.full
          padding 0
        img.poster
          display: block
          margin-bottom px2rem(50px)
          width 100%
          height auto
          transition opacity .3s
          &:hover
            opacity .9
        img
          max-width 100%
          height auto
        > h2
          margin 0 0 px2rem(50px)
        h2
        h3
        h4
        h5
        h6
          border none
        .content
          padding 0
      &-meta
        text-align right
        width px2rem(100px)
        font-size px2rem(14px)
        color $viceTextColor
      &-tag
        font-size px2rem(14px)
        color $viceTextColor
        span + span
          margin-left 0.5rem
  @media (max-width: $MQNarrow)
    {$theme}
      &article
        &-excerpt
          padding 0 0 0 px2rem(20px)
  @media (max-width: $MQMobile)
    {$theme}
      &article
        &-meta
          display none
</style>