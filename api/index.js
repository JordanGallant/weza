const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
}));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let notifications = [];
let clients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');
  // Add the new client to the list of clients
  clients.push(ws);

  ws.send(JSON.stringify({ type: 'initial', notifications }));

  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
    console.log('Client disconnected');
  });
});

app.post('/send-notification', (req, res) => {
  const { title, description, location } = req.body;
  const newNotification = {
    id: (notifications.length + 1).toString(),
    title,
    description,
    location,
    timestamp: Date.now()
  };

  notifications.push(newNotification);

  // Broadcast the new notification to all connected clients
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'new-notification', notification: newNotification }));
    }
  });

  res.status(201).json(newNotification);
});

// HTTP endpoint to fetch all notifications
app.get('/notifications', (req, res) => {
  res.json(notifications);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
//Co authored by Jordan and Enes