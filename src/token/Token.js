import fs from 'fs'
import path from 'path'
import https from 'https'
import axios from 'axios'

require('dotenv').config();

const cert = fs.readFileSync(
    path.resolve(__dirname, `../../certs/${process.env.CERT}`)
    )
    
    // --- carrega certificado 
    const agent =  new https.Agent({
        pfx: cert,
        passphrase: ''
    })
    const credential = Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString('base64')
    
    // --- criação do header da requisição no gerencianet

const ResponseToken = async  () => {
    const accessToken = await axios({
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
    // --- retorna o token de acesso  
    return accessToken.data?.access_token
}
export default ResponseToken