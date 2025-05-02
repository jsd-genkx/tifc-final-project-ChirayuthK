const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory data storage
let messages = [];

// Get all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Create a new message
app.post('/messages', (req, res) => {
  if (!req.body.text || !req.body.user) {
    return res.status(401).send('Text and user are required');
  }
  const message = {
    id: messages.length + 1,
    text: req.body.text,
    user: req.body.user,
  };
  messages.push(message);
  res.status(200).json(message);
});

// Get a message by ID
app.get('/messages/:id', (req, res) => {
  const message = messages.find(m => m.id === parseInt(req.params.id));
  if (!message) return res.status(404).send('Message not found');
  res.json(message);
});

// Update a message
app.put('/messages/:id', (req, res) => {
  const message = messages.find(m => m.id === parseInt(req.params.id));
  if (!message) return res.status(404).send('Message not found');

  if (!req.body.text) {
    return res.status(401).send('Text is required');
  }

  message.text = req.body.text;
  res.json(message);
});

// Delete a message
app.delete('/messages/:id', (req, res) => {
  const messageIndex = messages.findIndex(m => m.id === parseInt(req.params.id));
  if (messageIndex === -1) return res.status(404).send('Message not found');
  messages.splice(messageIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log('Server is running...');
});
