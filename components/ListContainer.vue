<template>
  <div class="theme-track--tag">
    <h2>{{ title }}</h2>
    <div>
      <ul
        v-if="type === 'list'"
        class="category-list"
      >
        <li
          v-for="(item, idx) in list"
          :key="idx"
        >
          <router-link :to="item.path" class="tag-link">
            {{item.name}} ({{item.pages.length}})
          </router-link>
        </li>
      </ul>
      <ul
        v-else-if="type === 'weekly'"
        class="category-list"
      >
        <li
          v-for="(item, idx) in list"
          :key="idx"
        >
          <router-link :to="item.path" class="tag-link">
            {{item.title}}
          </router-link>
        </li>
      </ul>
      <Tag v-else v-for="(item, idx) in list"
        :key="idx"
      >
        <router-link :to="item.path" class="tag-link">
          # {{item.name}} ({{item.pages.length}})
        </router-link>
      </Tag>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'title', 'type']
}
</script>

<style lang="stylus">
{$theme}
  &tag
    padding px2rem(30px) 0
    min-height calc(100vh - 220px)
    > h2
      border-bottom 1px dotted lighten($borderColor, 30%)
.tag-link
  color #657786
  transition all .2s ease-in-out
  &:hover
    color $accentColor
.category-list
  margin 0 1rem
  > li
    > a
      color $accentColor
      &:hover
        color lighten($accentColor, 20%)
</style>