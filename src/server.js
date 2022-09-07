if(process.env.NODE_ENV !== 'prod')
require('dotenv').config()

const axios = require('axios')
const fs = require('fs')
const path = require('path')
const https = require('https')
const express = require('express')

const app = express()
app.get('/', async (req,res) => {
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
    
    const ResponseToken = await axios({
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
    })
    const accessToken = ResponseToken.data?.access_token
    
    const http = axios.create({
        baseURL: process.env.HOST,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        }
    })
    
    const dataCobranca = {
        calendario: {
            expiracao: 3600
        },
        devedor: {
            cpf: "12345678909",
            nome: "Francisco da Silva"
        },
        valor: {
            original: "123.45"
        },
        chave: "71cdf9ba-c695-4e3c-b010-abb521a3f1be",
        solicitacaoPagador: "Informe o número ou identificador do pedido."
    }

    const Cobranca = await http.post('/v2/cob', dataCobranca) 
    const Qrcode = await http.get(`/v2/loc/${Cobranca.data.loc.id}/qrcode`)
    res.send(Qrcode.data)
})


app.listen(3000,() => console.log('server is running at port 3000'))