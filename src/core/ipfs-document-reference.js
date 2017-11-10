'use strict'

var fs = require('fs')

var ethContract = require('./eth-contract')
var contractName = 'IPFSDocumentReference'

module.exports = {
  publish: function (web3, callback) {
    ethContract.publish(web3, 'IPFSDocumentReference', web3.eth.accounts[0], function (err, abi) {
      callback(null, abi)
    })
  },
  setIPFSHash: function (web3, contractAddress, accountAddress, accountPassword, ipfsHash, callback) {
    ethContract.getABI('IPFSDocumentReference', function (err, abi) {
      if(err) return callback(err)
      var contract = web3.eth.contract(abi)
      var contractInstance = contract.at(contractAddress)
      web3.personal.unlockAccount(accountAddress, accountPassword)
      contractInstance.setIPFSHash.sendTransaction(ipfsHash, {
        from: accountAddress,
        gas:4000000
      }, function (err, result) {
        if(!err) {
          callback(null, result)
        } else {
          callback(err)
        }
      })
    })
  }

}
