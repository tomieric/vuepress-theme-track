const fs = require('fs-extra')
const path = require('path')
const ora = require('ora')
const YAML = require('yamljs')

function normalizeYaml(title, tags = '', author = '') {
  const date = new Date()
  const ymlPath = path.resolve(__dirname, 'template.yml')

  let matterObject = YAML.load(ymlPath)
  const result = Object.assign({}, matterObject, {
      date: date.toISOString().replace(/T/, ' ').replace(/\.(\w+)/, ''),
      author: author,
      tag: tags,
      title: title
  })

  return YAML.stringify(result, 4, 2)
}

module.exports = (config) => {
  const title = config.post.replace(/.*\/(\w+)\.(\w+)/g, '$1')
  const spinner = ora('')
  const filePath = path.resolve(config.dest || '', config.post + '.md')
  const frontmatter = normalizeYaml(title, config.tag, config.author)
  const metaBanner = `---\n${frontmatter}---`
  fs.ensureFileSync(filePath)
  fs.writeFileSync(
    filePath,
    metaBanner
  )
  spinner.succeed(`Create ${title} succeeded!`)
}
