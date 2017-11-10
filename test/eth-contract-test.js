'use strict'

var ethContract = require('../src/core/eth-contract')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

describe('eth contract tests', function() {

  it('write ABI test', function(done) {
    ethContract.writeABI('IPFSDocumentReference', function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

  it('get ABI test', function(done) {
    ethContract.getABI('IPFSDocumentReference', function (err, abi) {
      if(err) return console.log(err)
      console.log(abi)
      done()
    })
  })

  it('get byte code test', function(done) {
    ethContract.getByteCode('IPFSDocumentReference', function (err, byteCode) {
      if(err) return console.log(err)
      console.log(byteCode)
      done()
    })
  })

  it('publish test', function(done) {

    ethContract.publish(web3, 'IPFSDocumentReference', web3.eth.accounts[1], function (err, contractAddress) {
      if(err) return console.log(err)
      console.log('Conctact Address: ' + contractAddress)
      done()
    })
  })

})
