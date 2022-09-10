import tokenController from '../token/Token.js' 
import https from 'https'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

require('dotenv').config();

// criação do header da autenticação para a requisição na api da gerencianet
const cert = fs.readFileSync(
    path.resolve(__dirname, `../../certs/${process.env.CERT}`)
)

const agent =  new https.Agent({
    pfx: cert,
    passphrase: ''
})
// 

class Cobranca {
    // store == post 
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
            
            let dataCobranca = {}
            
            // validação da requisição  
            
            if(req.body.chave && req.body.valor.original && req.body.calendario.expiracao){
                dataCobranca = req.body
            }else {
                return res.status(401).json({err: 'falta atributos obrigatorios'})
            }

            // se ta tudo certo com a requisição faz o envio da cobrança na gerencianet 
            const cobranca = await http.post('/v2/cob', dataCobranca) 
            const Qrcode = await http.get(`/v2/loc/${cobranca.data.loc.id}/qrcode`)
            // retorna a os dados da cobrança e o qrcode
            return res.status(200).send({...Qrcode.data, ...cobranca.data})
        } catch (e) {
          return res.status(400).json({err: 'erro na comunicação'});
        }
    }

}
export default new Cobranca