const Web3 = require('web3');
const EthLibAccount = require('eth-lib/lib/account');

const web3 = new Web3('https://rinkeby.infura.io/v3/f10adc80f0934a7fbe645e28ff38fc5e');
const context = web3.utils.fromAscii('Cygnus');
const timestamp = Date.now();
const score = 91;
const nodePrivateKey = '0x313ecd4fd2dd58326f3c743798f777fa350ff16a21aa19b3243e0bf45dbb0b1a';
const userAddress = '0x4349Ec6FfB691F7a7B5FF384e05D06B54Df55954';
const message = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address', 'bytes32', 'uint32', 'uint64'], [userAddress, context, score, timestamp]));
const sig = EthLibAccount.sign(message, nodePrivateKey);
const vrs = EthLibAccount.decodeSignature(sig);
const signerAddress = web3.eth.accounts.recover(message, vrs[0], vrs[1], vrs[2], true);

console.log("message: " + message);
console.log("signerAddress: " + signerAddress);
console.log("userAddress: " + userAddress);
console.log("context: " + context);
console.log("score: " + score);
console.log("timestamp: " + timestamp);
console.log("v: " + vrs[0]);
console.log("r: " + vrs[1]);
console.log("s: " + vrs[2]);
// console.log(web3.eth.accounts.create());
//  address: '0x8b102411976Fd5621788f10C0397762C8bc38f14',
//  privateKey: '0x313ecd4fd2dd58326f3c743798f777fa350ff16a21aa19b3243e0bf45dbb0b1a',

const contractAddress = '0xb4ee3f8ab287f042d06b44858b447d1198ee9885'

process.exit(0);
