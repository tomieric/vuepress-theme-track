export default ({ Vue }) => {
  if (typeof window !== 'undefined') {
    const VueParticles = require('vue-particles/vue-particles/vue-particles')
    const Tippy = require('v-tippy')
    const VueSticky = require('vue-sticky')
    Vue.use(VueParticles)
    Vue.use(Tippy)
    Vue.directive('sticky', VueSticky.default)
  }
}