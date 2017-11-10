'use strict'

const testRPC = require('../src/core/test-rpc')

describe('testrpc test', function() {

  it('testrpc test', function(done) {
    testRPC.setup(function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

})
