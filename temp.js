const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle incoming webhook requests
app.post('/webhooks/orders/create', (req, res) => {
  console.log('🎉 New order webhook received:');
  console.log(req.body); // Output the JSON object of the request body
  res.sendStatus(200); // Send a 200 OK response to acknowledge receipt of the webhook
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
