const path = require('path')

module.exports = {
  layoutDir: './src/layouts',
  plugins: [
    ['@vuepress/back-to-top'],
    ['@vuepress/medium-zoom'],
    ['@vuepress/google-analytics'],
    ['@vuepress/active-header-links'],
    ['@vuepress/register-components', {
      componentsDir: [
        path.resolve(__dirname, 'components')
      ]
    }],
    ['@yubisaki/blog', {
      pageEnhancers: [
        {
          when: ({ frontmatter }) => frontmatter.pageLayout === 'Activity',
          frontmatter: { layout: 'Activity' }
        },
        {
          when: ({ frontmatter }) => frontmatter.pageLayout === 'Home',
          frontmatter: { layout: 'Home' }
        },
        {
          when: ({ frontmatter }) => frontmatter.pageLayout === 'Layout',
          frontmatter: { layout: 'Layout' }
        },
        {
          when: ({ frontmatter }) => frontmatter.pageLayout === 'Weekly',
          frontmatter: { layout: 'Weekly' }
        },
        {
          when: ({ frontmatter }) => frontmatter.type === 'weekly',
          frontmatter: { layout: 'Page' }
        },
        {
          when: ({ path }) => path.startsWith('/weekly'),
          frontmatter: { showAuthor: false, next: false, sidebar: false }
        }
      ]
    }],
    ['@yubisaki/pagination'],
    'flowchart',
    [require('./util/plugin')]
  ],
  chainWebpack: config => {
    const patterns = [
      path.resolve(__dirname, './styles/config.styl'),
      path.resolve(__dirname, './styles/mixins.styl')
    ]
    config.module.rule('stylus').oneOf('normal')
                  .use('style-resource')
                  .loader('style-resources-loader')
                  .options({ patterns })
  }
}
