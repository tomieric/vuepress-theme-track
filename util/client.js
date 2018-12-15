export default ({ Vue }) => {
  if (typeof window !== 'undefined') {
    const Tippy = require('v-tippy')
    const VueSticky = require('vue-sticky')

    Vue.use(Tippy)
    Vue.directive('sticky', VueSticky.default)
  }
}