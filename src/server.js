if(process.env.NODE_ENV !== 'prod')
require('dotenv').config()

const axios = require('axios')
const fs = require('fs')
const path = require('path')
const https = require('https')

const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${process.env.CERT}`)
)

const agent =  new https.Agent({
    pfx: cert,
    passphrase: ''
})

const credential = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
).toString('base64')

console.log(cert)
axios({
    method: 'POST',
    url: `${process.env.HOST}/oauth/token`,
    headers: {
        Authorization: `Basic ${credential}`,
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    data: {
        grant_type: 'client_credentials'
    }
}).then(console.log).catch(console.log)