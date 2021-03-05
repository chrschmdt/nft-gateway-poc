const express = require('express');
const jwt = require('jsonwebtoken');
const Web3 = require('web3')
const axios = require('axios')

// our secret data
const protectedData = [
    {id:1, name: 'Alice', occupation:'Blockchain developer 👩🏻‍💻'},
    {id:2, name: 'Brian', occupation:'Digital artist 👨🏻‍🎨'},
    {id:3, name: 'Carlos', occupation:'Social media influencer 🤳🏻'}
];

// constant string literals
const SECRET = 'Why so serious?';
const message = 'Only sign this message for NFT Gateway POC.';
const rpc = 'https://mainnet.infura.io/v3/YOUR_API_KEY_HERE'; // update this
const nft = '0xc2c747e0f7004f9e8817db2ca4997657a7746928'; // contract address
const tokenExpiry = '15m';
const balanceRequired = 0;

// more globals
const app = express();
const web3 = new Web3(rpc);
let contract = undefined;

// get ABI and make contract
axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${nft}`).then(res => {
    const abi = JSON.parse(res.data.result);
    contract = new web3.eth.Contract(abi, nft)
});

app.use(express.json());

// set CORS support
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/api/data', parseToken, (req, res) => {
    jwt.verify(req.token, SECRET, e => {
        if (e) res.sendStatus(403);
        else res.json(protectedData);
    });
});

app.post('/api/verify2', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

app.post('/api/verify', (req, res) => {

    // authenticate as address owner
    let address;
    try {
        address = req.body.address;
        const signer = web3.eth.accounts.recover(message, req.body.signature);
        if (signer !== address) return res.sendStatus(401);
    } catch {
        return res.sendStatus(400);
    }

    // check for NFT
    if (!contract) return res.status(500).send('Server connecting to ethereum...');
    contract.methods.balanceOf(address).call((error, result) => {
        if (error) return res.status(500).send('Problem communicating with ethereum');
        if (parseFloat(result) > balanceRequired)
            jwt.sign(req.body, SECRET, { expiresIn: tokenExpiry }, (e, token) => {
                res.json({token});
            });
        else res.status(401).send(`Insufficient funds. Acquire token ${nft} for access.`)
    });
});

function parseToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'undefined') {
        req.token = authHeader.split(' ')[1];
        next();
    } else res.sendStatus(403);
}

app.listen(3005, () => console.log('Listening on port 3005...'));
