// import tokenController from '../token/Token.js' 
// import https from 'https'
// import axios from 'axios'
// import fs from 'fs'
// import path from 'path'
// import bodyParser from 'body-parser'


require('dotenv').config();


// const cert = fs.readFileSync(
//     path.resolve(__dirname, `../../certs/${process.env.CERT}`)
// )

// const agent =  new https.Agent({
//     pfx: cert,
//     passphrase: ''
// })

class Webhook {
    // index == get
    async index (req, res) {
        try {
            console.log(req.body)
            return res.status(200).send({...Qrcode.data, ...cobranca.data})
        } catch (e) {
            return res.status(400);
        }
    }

}
export default new Webhook