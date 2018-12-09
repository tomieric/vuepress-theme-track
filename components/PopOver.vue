<template>
  <div v-if="rendered" v-show="value" class="popover" :style="{ top: popTop + 'px', width: width + 'px'}">
    <div class="github-card">
      <div class="github-header"></div>
      <a :href="userUrl" class="user-link" target="_blank" :style="{ width: top + 'px', height: top + 'px' }">
        <img :src="avatar || authorAvatar" class="github-avatar" :style="{ width: top + 'px', height: top + 'px' }" />
      </a>
      <h3>@{{ name || user }}</h3>
      <ul class="github-info">
          <li><a :href="repoUrl" target="_blank"><strong>{{ repoNum }}</strong>repos</a></li>
          <li><a :href="gistsUrl" target="_blank"><strong>{{ gistsNum }}</strong>gists</a></li>
          <li><a :href="followersUrl" target="_blank"><strong>{{ followersNum }}</strong>followers</a></li>
      </ul>
    </div>
    <div class="popover-arrow"></div>
  </div>
</template>
<style lang="stylus">
  .popover
    position absolute
    top 100%
    left 50%
    transform translate(-50%, 0)
    background #fff
    border 1px solid #ebeef5
    border-radius 4px
    min-width 200px
    box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
    &-arrow
      position absolute
      top -6px
      margin-left -6px
      left 50%
      display block
      margin-right 3px
      width 0
      height 0
      border-color transparent
      border-width 6px
      border-style solid
      filter drop-shadow(0 2px 12px rgba(0,0,0,.03))
      border-bottom-color #6dd4d5
      border-top-width 0
      &::after
        position absolute
        top 1px
        display block
        margin-left -6px
        width 0
        height 0
        border-style solid
        border-color transparent
        content " "
        border-width 6px
        border-top 0
        border-bottom-color #75d6d4
  .github-card
    text-align center
    h3
      margin: .5em 0 1em
      font-weight 200
      text-decoration none
  .github-header
    height 100px
    position relative
    padding 0
    margin 0
    background: linear-gradient(to right, #EAECC6, #2BC0E4)
  .github-avatar
    display block
    background $darkBgColor
    // border 1px solid lighten($borderColor, 20%)
    border none!important
  .user-link
    display inline-block
    overflow hidden
    // https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
    -webkit-mask-image -webkit-radial-gradient(white, black)
    background #fff
    border-radius 100%
    box-shadow 0 1px 1px rgba(0, 0, 0, 0.3)
    text-decoration none
    margin-top -43px
    border 3px solid #fff
    position relative
  .github-info
    font-size 12px
    color $viceTextColor
    list-style-type none
    margin 0
    padding 0
    border-top 1px solid #eee
    zoom 1
    a
      color $viceTextColor
      &:hover
        color $accentColor
    strong
      display block
      color #292f33
      font-size 16px
      line-height 1.6
    li
      width 33.33%
      float left
      font-size 12px
      padding 8px 0
      box-shadow 1px 0 0 #eee
</style>
<script>
  import Popup from 'vue-popup'
  const urlMap = {
    repoTab: '?tab=repositories',
    followersTab: '?tab=followers'
  }
  export default {
      mixins: [Popup],
      props: {
        modal: {
          default: true
        },
        closeOnClickModal: {
          default: true
        },
        top: {
          type: Number,
          default: 0
        },
        user: {
          type: String,
          required: true
        },
        width: {
          type: Number,
          required: true
        }
      },
      data () {
        return {
          name: "",
          userUrl: null,
          avatar: null,
          repoNum: null,
          repoUrl: null,
          followersNum: null,
          followersUrl: null,
          gistsNum: null,
          gistsUrl: null
        }
      },
      computed: {
        popTop () {
          return this.top + 6
        },
        authorAvatar () {
          return 'https://github.com/'+ (this.user || 'Kuaizi-co') +'.png?size=' + (this.top || 50)
        }
      },
      methods: {
        githubUserInfo(user) {
          return fetch(`https://api.github.com/users/${user}`)
            .then(data => {
              // this.show = true
              return data.text()
            })
            .then(text => JSON.parse(text))
        },
        githubInfoHandle(userInfo) {
          const {
            avatar_url,
            name,
            html_url,
            followers,
            public_gists,
            public_repos
          } = userInfo
          this.avatar = avatar_url + '&size=' + this.top
          this.name = name
          this.userUrl = html_url
          this.repoNum = public_repos
          this.repoUrl = `${html_url}${urlMap.repoTab}`
          this.followersNum = followers
          this.followersUrl = `${html_url}${urlMap.followersTab}`
          this.gistsNum = public_gists
          this.gistsUrl = `https://gist.github.com/${this.user}`
        }
      },
      watch: {
        rendered () {
          if (!this.user) return
          this.githubUserInfo(this.user).then(this.githubInfoHandle)
        }
      }
    }
</script>