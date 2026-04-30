const express = require('express');
const app = express();

app.use(express.json());

// 🔥 THIS fixes your Meta callback problem
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "mytoken123";

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Incoming messages (for later)
app.post('/webhook', (req, res) => {
  console.log("Incoming message:", req.body);
  res.sendStatus(200);
});

// Health check
app.get('/', (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => console.log("Server running"));
