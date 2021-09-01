
const sha256 = require('sha256');

function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];

    const previousBlockHash ='0';
    const currentData = "Hello This is my First block - Harshit"
    const nonce = this.proofOfWork(previousBlockHash, currentData);
    const hash = this.hash(nonce, currentData, previousBlockHash);
    this.createNewBlock(nonce, previousBlockHash, hash);
}

Blockchain.prototype.createNewBlock=function(nonce, previousBlockHash, hash){

    const newBlock={
        index : this.chain.length+1,
        nonce: nonce,
        timestamp : Date.now(),
        transactions:this.pendingTransactions,
        hash:hash,
        previousBlockHash:previousBlockHash
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1];
}


Blockchain.prototype.createNewTransactions=function(amount, sender, receiver){
    const newTransaction={
        amount:amount,
        sender:sender,
        receiver:receiver
    };

    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()['index']+1;

}




Blockchain.prototype.hash = function(nonce, currentData, previousBlockHash){
    const data = JSON.stringify(currentData)+previousBlockHash+nonce.toString();
    const hash = sha256(data);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentData){
    
    let nonce = 0;
    let hash = this.hash(nonce, currentData, previousBlockHash);
    while(hash.substring(0,4) != '0000'){
        nonce++;
        hash = this.hash(nonce, currentData, previousBlockHash);

    }
    
    
    return nonce;
}

module.exports= Blockchain