import tokenController from '../token/Token.js' 
import https from 'https'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

require('dotenv').config();


const cert = fs.readFileSync(
    path.resolve(__dirname, `../../certs/${process.env.CERT}`)
)

const agent =  new https.Agent({
    pfx: cert,
    passphrase: ''
})

class Webhook {
    async store (req, res) {
        try {
            const http = axios.create({
                baseURL: process.env.HOST,
                httpsAgent: agent,
                headers: {
                    Authorization: `Bearer ${await tokenController()}`,
                    'Content-type': 'application/json'
                }
            })
            const dataCobranca = req.body


            const cobranca = await http.post('/v2/cob', dataCobranca) 
            const Qrcode = await http.get(`/v2/loc/${cobranca.data.loc.id}/qrcode`)
            return res.status(400).send({...Qrcode.data, ...cobranca.data})
        } catch (e) {
          return res.status(400);
        }
    }

}
export default new Webhook