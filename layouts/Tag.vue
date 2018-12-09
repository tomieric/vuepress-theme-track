<template>
  <LayoutContainer>
    <img 
        v-if="$page.frontmatter.poster" 
        :src="$page.frontmatter.poster"
        class="theme-track--page-poster"
       />
    <List custom-class="no-pager" :items="$tag ? $tag.pages : []" />
  </LayoutContainer>
</template>
