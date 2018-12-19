<template>
  <LayoutContainer>
    <contentWrapper>
      <img 
        v-if="$page.frontmatter.poster" 
        :src="poster"
        class="theme-track--page-poster"
       />
      <ListContainer
        v-if="$weeklies && $weeklies.length"
        :list="$weeklies"
        title="周刊" 
        type="weekly"
      />
    </contentWrapper>
  </LayoutContainer>
</template>

<script>
  import { isExternal } from '../util'
  export default {
    computed: {
      poster () {
        return isExternal(this.$page.frontmatter.poster) ? this.$page.frontmatter.poster : this.$withBase(this.$page.frontmatter.poster)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .theme-track--page-poster
    min-height 100px
</style>