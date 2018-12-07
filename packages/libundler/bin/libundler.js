#!/usr/bin/env node
/* eslint no-unused-expressions: 0 */

const fs = require('fs')
const yargs = require('yargs')

const defineArgs = yargs => {
  yargs.positional('source', {
    alias: 'src',
  })
  yargs.positional('dest', {
    alias: 'd',
    default: 'dist',
  })
  yargs.positional('exclude', {
    default: [],
    array: true,
  })
  yargs.positional('external', {
    alias: 'e',
  })
  yargs.positional('target', {
    default: 'node',
  })
  yargs.positional('formats', {
    alias: 'f',
    default: ['umd', 'cjs', 'es'],
    array: true,
  })
  yargs.positional('typescript', {
    alias: 'ts',
    default: false,
  })
  yargs.positional('useBabel', {
    default: true,
  })
  yargs.positional('cwd', {
    default: fs.realpathSync(process.cwd()),
  })
  yargs.positional('compress', {
    alias: 'c',
    default: false,
  })
  yargs.positional('hash', {
    default: false,
  })
  yargs.positional('sourcemap', {
    alias: 'sm',
    default: false,
  })
}

yargs
  .usage('$0 <cmd> [args]')
  .command('build [opts]', 'Build once and exit', defineArgs, () => {
    require('../scripts/build')()
  })
  .command('watch [opts]', 'Rebuilds on any change', defineArgs, () => {
    require('../scripts/build')(true)
  })
  .demandCommand()
  .help()
  .wrap(72)
  .epilog('for more information visit https://github.com/pedronauck/libundler')
  .showHelpOnFail(false, 'whoops, something went wrong! run with --help').argv
