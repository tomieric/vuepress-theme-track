<template>
  <LayoutContainer>
    <contentWrapper>
      <img 
        v-if="$page.frontmatter.poster" 
        :src="poster"
        class="theme-track--page-poster"
       />
      <ListContainer 
        :list="$categories.list"
        title="Categories" 
        type="list"
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