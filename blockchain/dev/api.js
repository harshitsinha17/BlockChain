const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false} ));

const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/blockchain', function(req, res){
  res.send(bitcoin);
});
 
app.post('/transaction', function(req, res){
    const index = bitcoin.createNewTransactions(req.body.amount, req.body.sender, req.body.receiver);
    console.log(req.body);
    res.json({ note: `The transaction would be added to block ${index}`  });
});

app.get('/mine', function(req, res){

  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentData = {
    transactions: bitcoin.pendingTransactions,
    index : lastBlock['index']+1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentData);
  const hash = bitcoin.hash(nonce, currentData, previousBlockHash);
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash);

  bitcoin.createNewTransactions("12.5","00", nodeAddress);

  res.json(
    {
      note:`Successfully mined a new block`,
      block:newBlock
    }
  );

});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});