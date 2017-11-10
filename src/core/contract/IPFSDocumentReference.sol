pragma solidity ^0.4.0;
contract  IPFSDocumentReference {
    string public ipfsHash;
    function setIPFSHash(string hash) public {
        ipfsHash = hash;
    }
}
