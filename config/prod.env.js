'use strict'

let HOST = process.argv.splice(2)[0] || 'prod'
switch (HOST) {
  case 'test':
    HOST = 'test'
    break;
  case 'rel':
    HOST = 'release_production'
    break;
  case 'prod':
    HOST = 'production'
    break;
  default:
    HOST = 'production'
    break;
}
module.exports = {
  NODE_ENV: '"production"',
  HOST: '"' + HOST + '"'
}
