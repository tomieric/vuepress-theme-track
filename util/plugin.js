const path = require('path')
module.exports = (options, ctx) => {
  const {
    pageEnhancers = []
  } = options
  return {
    name: 'track-plugin',
    enhanceAppFiles: [
      path.resolve(__dirname, 'client.js')
    ],
    extendPageData (pageCtx) {
      const { frontmatter: rawFrontmatter } = pageCtx
      pageEnhancers.forEach(({
        when,
        frontmatter = {},
        data = {}
       }) => {
         if (when(pageCtx)) {
          Object.assign(rawFrontmatter, frontmatter)
          Object.assign(pageCtx, data)
         }
       })
    }
  }
}