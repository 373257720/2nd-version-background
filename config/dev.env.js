'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "'development'",
  ENV_CONFIG: "'dev'",
  BASE_API: "'http://47.90.62.114:8086'",
})
