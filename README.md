# api pix nodejs 

npm i
npm run dev


# rodar projeto em produção

1. se pela primeira vez 
~~~bash
 sudo docker compose -f "docker-compose.yml" up -d --build 
~~~
2. caso ja instalado 
~~~bash
 sudo docker compose up -d  
~~~
## exemplo de objeto a ser enviado para a rota /cobranca POST
-  OBRIGATORIO*
~~~javascript
{
"calendario": {
    "expiracao": 3600 // * o tempo de vida da cobrança dado em segundos
},
"devedor": {
    "cpf": "12345678909",        // informações de quem vai pagar a cobrança
    "nome": "Francisco da Silva"
},
"valor": {
    "original": "0.05" // * valor da cobrança sempre tra duas casas decimais 
},
"chave": "627b1c71-2440-4894-b225-754ba24681fa", // * a chave do pix do dono da conta do gerencianet
"solicitacaoPagador": "Informe o número ou identificador do pedido."  // mensagem da cobrança 
}
~~~

## retorna 

~~~javascript
{
    "qrcode": "00020101021226880014BR.GOV.BCB.PIX2566qrcodes-pix.gerencianet.com.br/v2/9e4bce729816436399431ee351efd4985204000053039865802BR5914GERENCIANET SA6010OURO PRETO62070503***63041DCC",
    "imagemQrcode": "data:image/png;base64,", // usar como imagem do qrcode 
    "calendario": {
        "criacao": "2022-09-09T13:48:06.330Z",
        "expiracao": 3600 // tempo de duração do qrcode
    },
    "txid": "01952d52fc5949f0a0b837eb7f534bd7", // txid para visualizar o webhook 
    "revisao": 0,
    "loc": {
        "id": 2,
        "location": "qrcodes-pix.gerencianet.com.br/v2/9e4bce729816436399431ee351efd498",
        "tipoCob": "cob",
        "criacao": "2022-09-09T13:48:06.349Z" 
    },
    "location": "qrcodes-pix.gerencianet.com.br/v2/9e4bce729816436399431ee351efd498",
    "status": "ATIVA",
    "devedor": {
        "cpf": "12345678909",
        "nome": "Francisco da Silva"
    },
    "valor": {
        "original": "0.05"
    },
    "chave": "627b1c71-2440-4894-b225-754ba24681fa",
    "solicitacaoPagador": "Informe o número ou identificador do pedido."
}
~~~

#### end points 
* /cobranca
* /webhook/:txid

##### INFROMAÇÕES DO .env
- CLIENT_ID  = e o client id que tem no gerencianet 
- CLIENT_SECRET = pega junto com o client id na dash do gerencianet
- HOST = o host da api do gerencianet 
- CERT = nome do certificado .p12

##### CRIAR UMA PASTA NA RAIZ COM O NOME DE 'certs' para colocar os certificado de produção e homologação

##### mais informações em https://dev.gerencianet.com.br/docs/api-pix-introducao && https://www.youtube.com/watch?v=bo1THXaohU0