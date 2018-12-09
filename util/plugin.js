module.exports = (options, ctx) => {
  const {
    pageEnhancers = []
  } = options
  return {
    name: 'track-plugin',
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