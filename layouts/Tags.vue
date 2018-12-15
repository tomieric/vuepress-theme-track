<template>
  <LayoutContainer>
    <contentWrapper>
      <img 
        v-if="$page.frontmatter.poster" 
        :src="poster"
        class="theme-track--page-poster"
       />
      <listContainer
        v-if="$tags && $tags.list"
        :list="$tags.list" 
        title="Tags"
        style="min-height: auto"
      />
      <vue-word-cloud
        :words="words"
        :color="color"
        animation-easing="ease-in-out"
        :spacing="1"
        :rotation="rotation"
        font-family="Londrina Sketch"
        :font-size-ratio="1/5 "
        style="height: 300px; margin: 2rem 0 5rem"
      >
        <template slot-scope="{text, weight, word}">
          <div :title="weight + '篇 `' + text + '` 文章'" v-tippy="{ theme: 'light-border', duration: 200, animation: 'shift-toward', arrow: true }" style="cursor: pointer;" @click="onWordClick(word)">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>
    </contentWrapper>
  </LayoutContainer>
</template>

<script>
  import 'v-tippy/dist/tippy.css'
  import VueWordCloud from 'vuewordcloud'
  import { ensureExt, isExternal } from '../util'

  const rotationItems = [0, 1/8, 3/4, 7/8]
  const colors = ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']
  const Chance = items => items[Math.ceil(Math.random() * item.length)]

  export default {
    components: {
      [VueWordCloud.name]: VueWordCloud
    },
    computed: {
      words () {
        return this.$tags && this.$tags.list ? this.$tags.list.map(tag => [tag.name, tag.pages.length]) : []
      },
      poster () {
        return isExternal(this.$page.frontmatter.poster) ? this.$page.frontmatter.poster : this.$withBase(this.$page.frontmatter.poster)
      }
    },
    methods: {
      color () {
        return colors[Math.ceil(Math.random() * (colors.length - 1))]
      },
      rotation (word) {
        return rotationItems[Math.ceil(Math.random() * (rotationItems.length - 1))]
      },
      onWordClick (word) {
        this.$router.push({ path: ensureExt(`/tag/${word[0]}`) })
      }
    }
  }
</script>

<style>
/* latin */
@font-face {
  font-family: 'Londrina Sketch';
  font-style: normal;
  font-weight: 400;
  src: local('Londrina Sketch Regular'), local('LondrinaSketch-Regular'), url(https://fonts.gstatic.com/s/londrinasketch/v7/c4m41npxGMTnomOHtRU68eIJn8qvXmP4HIgqCQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
.tippy-tooltip.light-border-theme{background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,8,16,.15);color:#26323d;box-shadow:0 3px 14px -.5px rgba(0,8,16,.08)}.tippy-tooltip.light-border-theme .tippy-backdrop{background-color:#fff}.tippy-tooltip.light-border-theme .tippy-arrow:after,.tippy-tooltip.light-border-theme .tippy-arrow:before,.tippy-tooltip.light-border-theme .tippy-roundarrow:after,.tippy-tooltip.light-border-theme .tippy-roundarrow:before{content:"";position:absolute;z-index:-1}.tippy-tooltip.light-border-theme .tippy-roundarrow{fill:#fff}.tippy-tooltip.light-border-theme .tippy-roundarrow:after{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPjxwYXRoIGQ9Ik0zLDhjMCwwIDIuMDIxLC0wLjAxNSA1LjI1MywtNC4yMThjMS4zMzEsLTEuNzMxIDIuNTQ0LC0yLjc3NSAzLjc0NywtMi43ODJjMS4yMDMsLTAuMDA3IDIuNDE2LDEuMDM1IDMuNzYxLDIuNzgyYzMuMjUxLDQuMjIzIDUuMjM5LDQuMjE4IDUuMjM5LDQuMjE4bC0xOCwwWiIgc3R5bGU9ImZpbGw6IzAwMDgxNjtmaWxsLW9wYWNpdHk6MC4yMDM5MjI7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9zdmc+);background-size:24px 8px;width:24px;height:8px;left:0;top:0;fill:rgba(0,8,16,.15)}.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-roundarrow:after{top:1px;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-arrow{border-top-color:#fff}.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-arrow:after{border-top:7px solid #fff;top:-7px}.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-arrow:before{border-top:7px solid rgba(0,8,16,.2);bottom:-1px}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-roundarrow:after{top:-1px}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-arrow{border-bottom-color:#fff}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-arrow:after{border-bottom:7px solid #fff;bottom:-7px}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-arrow:before{border-bottom:7px solid rgba(0,8,16,.2);bottom:-6px}.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-roundarrow:after{left:1px;top:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-arrow{border-left-color:#fff}.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-arrow:after{border-left:7px solid #fff;left:-7px}.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-arrow:before{border-left:7px solid rgba(0,8,16,.2);left:-6px}.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-roundarrow:after{left:-1px;top:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-arrow{border-right-color:#fff}.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-arrow:after{border-right:7px solid #fff;right:-7px}.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-arrow:before{border-right:7px solid rgba(0,8,16,.2);right:-6px}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-arrow,.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-roundarrow,.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-arrow,.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-roundarrow{-webkit-transform:translateX(-1px);transform:translateX(-1px)}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-arrow:after,.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-border-theme .tippy-arrow:before,.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-arrow:after,.tippy-popper[x-placement^=top] .tippy-tooltip.light-border-theme .tippy-arrow:before{left:-7px;border-left:7px solid transparent;border-right:7px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-arrow,.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-roundarrow,.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-arrow,.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-roundarrow{-webkit-transform:translateY(-1px);transform:translateY(-1px)}.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-arrow:after,.tippy-popper[x-placement^=left] .tippy-tooltip.light-border-theme .tippy-arrow:before,.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-arrow:after,.tippy-popper[x-placement^=right] .tippy-tooltip.light-border-theme .tippy-arrow:before{top:-7px;border-top:7px solid transparent;border-bottom:7px solid transparent}
</style>