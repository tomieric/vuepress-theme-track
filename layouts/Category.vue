<template>
  <LayoutContainer>
    <img 
      v-if="$page.frontmatter.poster" 
      :src="$page.frontmatter.poster"
      class="theme-track--page-poster"
      />
    <List custom-class="no-pager" :items="category ? category.pages : []" />
  </LayoutContainer>
</template>

<script>
  export default{
    computed: {
      category () {
        const categoryName = this.$route.meta.categoryName
        const metaMap = this.$categories._metaMap
        return metaMap[categoryName]
      }
    }
  }
</script>