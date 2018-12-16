<template>
  <ContentWrapper custom-class="no-min-height">
    <nav class="pagination-nav">
      <router-link class="pagination-action pagination-prev" 
        :to="calcutePath($pagination.prevLink)"
        v-if="$pagination && $pagination.hasPrev">← </router-link>
      <div class="pagination-docker">
        <router-link v-for="({ path }, index) in pages"
          :key="index" 
          class="pagination-num"
          :to="calcutePath(path)"
          :class="hightlightCurrentPage(index + 1)">
          {{ index + 1 }}
        </router-link> 
      </div>
      <router-link class="pagination-action pagination-next" 
        :to="$pagination.nextLink"
        v-if="$pagination && $pagination.hasNext"> →</router-link>
    </nav>
  </ContentWrapper>
</template>

<script>
export default {
  computed: {
    pages () {
      if (!this.$pagination) return []
      if (!this.$pagination.pages) return []
      return this.$pagination.pages
    }
  },
  methods: {
    hightlightCurrentPage(pageNum) {
      return {
        'pagination-current': pageNum === this.$pagination.currentIndex + 1
      }
    },
    calcutePath (path) {
      const { pageRoot = '/' } = this.$themeConfig
      return path === '/' ? pageRoot : path
    }
  }
}
</script>

<style lang="stylus">
.pagination-nav
  padding px2rem(40px) 0
  text-align center
  clear both
  line-height 2
  overflow hidden
  a:hover
    color $accentColor
.pagination-action
  display block
  color $textColor
  text-align center
  cursor pointer
  width 2rem
  height 2rem
  border-radius 50%
  transition all .2s ease-in-out
  background-color #fff
.pagination-num
  cursor pointer
  transition all .2s ease-in-out
  color $textColor
  padding 10px 20px
  line-height 1
  height 2px
.pagination-docker
  display inline-block
  a:hover
    font-weight 800
  a:not(.pagination-current):hover
    color $textColor!important
.pagination-prev
  float left
.pagination-next
  float right
.pagination-current
  font-weight 700
  color $accentColor
</style>