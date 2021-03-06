'use strict'

var Legacy = require('./legacy')
var mdm = require('mdmanifest')
var apidoc = require('../../lib/apidocs').replicate
var Notify = require('pull-notify')
var pull = require('pull-stream')

module.exports = {
  name: 'replicate',
  version: '2.0.0',
  manifest: mdm.manifest(apidoc),
  //replicate: replicate,
  init: function (ssbServer, config) {
    var notify = Notify(), upto
    if(!config.replicate || config.replicate.legacy !== false) {
      var replicate = Legacy.call(this, ssbServer, notify, config)

      // replication policy is set by calling
      // ssbServer.replicate.request(id)
      // or by cancelling replication
      // ssbServer.replicate.request(id, false)
      // this is currently performed from the ssb-friends plugin

      return replicate
    }
    else
      return {
        request: function () {},
        changes: function () { return function (abort, cb) { cb(true) } }
      }
  }
}

