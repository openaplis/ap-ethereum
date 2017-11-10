'use static'

var path = require('path')
var ethAccount = require('./eth-account')

var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

module.exports = {
  setup: function (callback) {
    ethAccount.add(web3, 'password', function (err, newAccount) {
      
      callback(null, 'Setup Complete')
    })
  }
}
