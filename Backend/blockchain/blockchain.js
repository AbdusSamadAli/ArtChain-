const crypto = require('crypto');
class Blockchain {
  constructor() {
    this.chain = [];
    this.createGenesisBlock(); 
  }
  createGenesisBlock() {
    const genesisBlock = this.createNewBlock('Genesis Block', '0');
    this.chain.push(genesisBlock);
  }

  createNewBlock(artworkData, previousHash = '') {
    const block = {
      index: this.chain.length,
      timestamp: new Date().toISOString(),
      artworkData, 
      previousHash, 
      hash: this.calculateHash(artworkData, previousHash), 
    };
    return block;
  }
  calculateHash(artworkData, previousHash) {
    const data = `${previousHash}${JSON.stringify(artworkData)}${new Date().toISOString()}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
  addBlock(artworkData) {
    const previousBlock = this.chain[this.chain.length - 1];
    const newBlock = this.createNewBlock(artworkData, previousBlock.hash);
    this.chain.push(newBlock);
    console.log('New Block Created:', newBlock);
    return newBlock;
  }
  getChain() {
    return this.chain;
  }
}

module.exports = Blockchain;
