'use strict'

var ipfsDocumentReference = require('../src/core/ipfs-document-reference')
var ethAccount = require('../src/core/eth-account')

var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var contractAddress = null
var accountAddress = null
var accountPassword = 'password'
var ipfsHash = 'QmRjTvSuTpY7wyL1gHKBVfE8Us3YLgmtETeoZ6ChyaDTmn'

describe('ipfs document reference test', function() {

  it('add new account', function(done) {
    ethAccount.add(web3, accountPassword, function (err, result) {
      accountAddress = result
      console.log('account added: ' + accountAddress)
      done()
    })
  })

  it('send funds to new account', function(done) {
    var sender = web3.eth.accounts[1]
    ethAccount.send(web3, sender, accountAddress, 5, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

  it('publish test', function(done) {
    ipfsDocumentReference.publish(web3, function (err, result) {
      contractAddress = result
      console.log(result)
      done()
    })
  })

  it('set IPFShash test', function(done) {
    ipfsDocumentReference.setIPFSHash(web3, contractAddress, accountAddress, accountPassword, ipfsHash, function (err, result) {
      if(err) console.log(err)
      console.log(result)
      done()
    })
  })  

})
