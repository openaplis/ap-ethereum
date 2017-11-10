'use strict'

var ethAccount = require('../src/core/eth-account')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var account = null
var password = "password"

describe('Account Tests', function() {

  it('add test', function(done) {
    ethAccount.add(web3, password, function (err, result) {
      if(err) return console.log(err)
      account = result
      console.log(result)
      done()
    })
  })

  it('unlock test', function(done) {
    ethAccount.unlock(web3, account, password, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

  it('accounts test', function(done) {
    ethAccount.accounts(web3, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

  it('balance test', function(done) {
    ethAccount.balance(web3, account, function (err, result) {
      if(err) return console.log(err)
      console.log(result)
      done()
    })
  })

  it('send test', function(done) {
    this.timeout(5000)
    ethAccount.send(web3, web3.eth.accounts[0], account, 5, function (err, transactionHash) {
      if(err) return console.log(err)
      ethAccount.balance(web3, account, function (err, result) {
        console.log('The balance is: ' + result)
        done()
      })
    })
  })

})
