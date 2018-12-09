#!/usr/bin/env node

const program = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const pkg = require('../package.json')
const createPost = require('./createPost')

console.log(
  chalk.green(
      figlet.textSync('vp-track', { horizontalLayout: 'full' })
  )
)

program.version(pkg.version)
        .usage(`${chalk.green('vp-track')}`)
        .option('-p,--post <post>', 'post name')
        .option('-d,--dest <destination>', 'Destination folder')
        .option('-u,--author <author>', 'Github user name')
        .option('-t,--tag <tag>', 'Article tags')
        .on('--help', () => {
          console.log(`${chalk.cyan('vp-track')} ${chalk.green('--post <article filename>')}`)
        })
        .parse(process.argv)

if (program.post) {
  createPost(program)
} else {
  program.outputHelp()
}