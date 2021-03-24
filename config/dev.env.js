'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "'development'",
  ENV_CONFIG: "'dev'",
  //  BASE_API: "'http://192.168.1.45:8080'",
  BASE_API: "'http://47.90.62.114:8086'"
  // BASE_API: "'http://18.162.191.209:8086'",
  // BASE_API: "'http://192.168.1.37:8085'",
})
