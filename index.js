const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Permite receber JSON (o WhatsApp envia JSON)
app.use(bodyParser.json());

// Rota simples para teste no navegador
app.get('/', (req, res) => {
  res.send('Servidor do WhatsApp está online 🚀');
});
// 🔐 Endpoint de verificação do WhatsApp (Meta)
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'verifica123';

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado com sucesso!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 🔥 ROTA QUE O WHATSAPP VAI CHAMAR
app.post('/webhook', (req, res) => {
  console.log('Mensagem recebida do WhatsApp:');
  console.log(JSON.stringify(req.body, null, 2));

  // IMPORTANTE: responder 200 para o WhatsApp
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
