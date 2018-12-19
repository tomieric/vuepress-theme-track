const path = require('path')
module.exports = (options, ctx) => {
  const {
    pageEnhancers = [],
    weeklyUrl = '/weekly/'
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
    },

    ready () {
      const { pages } = ctx
      const weeklyMap = []

      pages.forEach((page) => {
        let { key, path, frontmatter: { type, title, date } } = page;
        if (type === 'weekly') {
          weeklyMap.push({ title, path, date })
        }
      })

      ctx.weeklyMap = weeklyMap

      const extraPages = [
        {
          permalink: weeklyUrl,
          path: weeklyUrl,
          frontmatter: { 
            title: 'weekly', 
            pageLayout: 'Weekly'
          }
        }
      ]

      extraPages.forEach(page => ctx.addPage(page));
    },

    async clientDynamicModules () {
      return [
        {
          name: 'weekly.js',
          content: `export default ${JSON.stringify(ctx.weeklyMap, null, 2)}`
        }
      ]
    }
  }
}