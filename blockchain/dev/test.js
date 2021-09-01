const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
bitcoin.createNewBlock(23445,'0hasdgshdvgs','12hdfhj');

bitcoin.createNewTransactions(10,'0HSYY','8AHSHAS');
bitcoin.createNewTransactions(20,'0HSYY','8AHSHAS');

bitcoin.createNewBlock(43211, '0HASGHAS','0GHSG');

bitcoin.createNewTransactions(30,'0HSYY','8AHSHAS');
bitcoin.createNewTransactions(40,'0HSYY','8AHSHAS');


const currentData =[ 
{

    amount:10,
    sender:'0HSDGSHD',
    receiver:'9HSDFH'
},
{
    amount:20,
    sender:'0HSDGSHD',
    receiver:'9HSDFH'

}
    

];

const hash = bitcoin.hash(1234, currentData, '0HJSDSJD');
console.log(hash);


const nonce = bitcoin.proofOfWork('00062356HGSDH', currentData);
console.log( "Executing proof of work "+bitcoin.hash(nonce, currentData, '00062356HGSDH' ) );


console.log(bitcoin); 