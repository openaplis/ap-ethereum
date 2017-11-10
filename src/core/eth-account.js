'use strict'

module.exports = {
  add: function (web3, password, callback) {
    var account = web3.personal.newAccount("password")
    callback(null, account)
  },
  unlock: function (web3, account, password, callback) {
    var result = web3.personal.unlockAccount(account, password)
    if(result == false) {
      callback(false)
    } else {
      callback(null, true)
    }
  },
  accounts: function (web3, callback) {
    callback(null, web3.eth.accounts)
  },
  balance: function (web3, account, callback) {
    var balance = web3.fromWei(web3.eth.getBalance(account), "ether")
    callback(null, balance.c[0])
  },
  send: function (web3, sender, receiver, amountEth, callback) {
    var amountWei = web3.toWei(amountEth, "ether")
    web3.eth.sendTransaction({from:sender, to:receiver, value: amountWei}, function (err, transactionHash) {
      callback(null, transactionHash)
    })    
  }
}
