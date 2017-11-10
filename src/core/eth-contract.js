'use strict'

var fs = require('fs')
var path = require('path')
var solc = require('solc')
var contractFolder = __dirname + '/contract'

module.exports = {
  writeABI: function (contractName, callback) {
    var baseFileName = path.join(contractFolder, contractName)
    var solFilename = baseFileName + '.sol'
    fs.readFile(solFilename, function (err, data) {
      var compiledCode = solc.compile(data.toString())
      var byteCode = compiledCode.contracts[':' + contractName].bytecode

      var abi = JSON.parse(compiledCode.contracts[':' + contractName].interface)
      var abiFileName = baseFileName + '.abi'
      fs.writeFile(abiFileName, compiledCode.contracts[':' + contractName].interface, function (err) {
        callback(null, 'ABI file Written')
      })
    })
  },
  getABI: function (contractName, callback) {
    var baseFileName = path.join(contractFolder, contractName)
    var abiFileName = baseFileName + '.abi'
    fs.readFile(abiFileName, function (err, data) {
      var abi = JSON.parse(data.toString())
      callback(null, abi)
    })
  },
  getByteCode: function (contractName, callback) {
    var solFile = path.join(contractFolder, contractName + '.sol')
    fs.readFile(solFile, function (err, data) {
      var compiledCode = solc.compile(data.toString())
      var byteCode = '0x' + compiledCode.contracts[':' + contractName].bytecode
      callback(null, byteCode)
    })
  },
  publish: function (web3, contractName, account, callback) {
    var solFile = path.join(contractFolder, contractName + '.sol')
    fs.readFile(solFile, function (err, data) {
      var compiledCode = solc.compile(data.toString())
      var byteCode = '0x' + compiledCode.contracts[':' + contractName].bytecode
      var abi = JSON.parse(compiledCode.contracts[':' + contractName].interface)
      var contract = web3.eth.contract(abi)
      contract.new(null, {from:account, data: byteCode, gas: 1000000}, function(e, contract) {
        if(!e) {
          if(!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
          } else {
            callback(null, contract.address)
          }
        } else {
          console.log(e)
        }
      })
    })
  }
}
