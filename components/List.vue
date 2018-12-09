<template>
  <ContentWrapper>
    <ul class="theme-track--list" :class="customClass">
      <li
        v-for="(item, itIdx) in items"
        :key="itIdx"
      >
        <Article :key="itIdx" :post="item"></Article>
      </li>
    </ul>
  </ContentWrapper>
</template>

<script>
  export default {
    props: ['items', 'customClass']
  }
</script>

<style lang="stylus">
{$theme}
  &list
    list-style none
    margin 0
    padding 0
    &.no-pager
      > li:last-child
        border-bottom none
    > li 
      margin-top px2rem(80px)
      padding-bottom px2rem(80px)
      border-bottom 1px dotted lighten($borderColor, 30%)
@media (max-width: $MQNarrow)
    {$theme}
      &list
        > li
          margin-top px2rem(50px)
          padding-bottom px2rem(50px)
</style>
