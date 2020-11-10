'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: "'test'",
  ENV_CONFIG: "'test'",
  BASE_API: "'http://47.90.62.114:8086'",
})
