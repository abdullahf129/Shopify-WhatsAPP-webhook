const express = require('express');
const app = express();
const getRawBody = require('raw-body');
const crypto = require('crypto');
const axios = require('axios'); // Make sure to install axios with npm install axios
const secretKey = '4cfa82b83e7848f93da4e21a2c3a4b8276d690466d54c0911828143481304bcd';
port = 5000;

const sendMessage = async (phoneNumber, messageText) => {
  const url = 'https://graph.facebook.com/v18.0/280885705102326/messages'; // Replace YOUR_PHONE_NUMBER_ID
  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "text",
    text: { body: messageText }
  };

  
  
try {
  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer EAAFoCtDgDE8BOZCYOSJ71CM5nDBtxPeTMvkn0ed2BY6NbD42EEHoXTHc7htFw9tEZBRyv39ZCZA1HEFcm4VYSLGvfaicUJRuMkctj1vwm5leuuUTErcHZBDW6TVvZBBszhZB8EPn6mNgoVP4bpeG4kSkT7G2XbEty6r6KwZCwFiV0tIkqI62kF5nCSf6R6KxbfUq1sFocSypfenxoIykjBNIB1teEVknVXQprSL5MSWfdegyBmZAz' // Replace with your actual access token
    }
  });
  console.log('Message sent successfully:', response.data);

  // Example of extracting message ID from the response
  const messageId = response.data.messages[0].id;
  console.log('Message ID:', messageId);
} catch (error) {
  console.error('Error sending message:', error.message);
  if (error.response) {
    console.error('Error details:', error.response.data);
  }
}
};


const sendMessageUsingTemplate = async (phoneNumber1, customerName, orderItems, totalAmount) => {
  const url = 'https://graph.facebook.com/v18.0/280885705102326/messages';
  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber1,
    type: "template",
    template: {
      name: "order_message", // Use the template's name as defined in the WhatsApp Business API
      language: {
        code: "en" // Adjust the language code if needed
      },
      components: [
        {
          type: "body",
          parameters: [
            {type: "text", text: customerName}, // Placeholder for customer name
            {type: "text", text: orderItems}, // Placeholder for order items, joined as a single string
            {type: "text", text: totalAmount.toString()} // Placeholder for total amount, converted to string if necessary
          ]
        }
      ]
    }
  };
  
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EAAFoCtDgDE8BOZCYOSJ71CM5nDBtxPeTMvkn0ed2BY6NbD42EEHoXTHc7htFw9tEZBRyv39ZCZA1HEFcm4VYSLGvfaicUJRuMkctj1vwm5leuuUTErcHZBDW6TVvZBBszhZB8EPn6mNgoVP4bpeG4kSkT7G2XbEty6r6KwZCwFiV0tIkqI62kF5nCSf6R6KxbfUq1sFocSypfenxoIykjBNIB1teEVknVXQprSL5MSWfdegyBmZAz' // Replace with your actual access token
      }
    });
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
};

app.post('/', async (req, res) => {
  console.log('🎉 We got an order!');

  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const body = await getRawBody(req);
  const bodyString = body.toString('utf-8');
  // console.log('Body contents:', bodyString);

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(body)
    .digest('base64');

  if (hash === hmac) {
    console.log('Phew, it came from Shopify!');
    
    try {
      const bodyObject = JSON.parse(bodyString); // Convert string back to object
      const phoneNumber1 = bodyObject.customer && bodyObject.customer.phone ; // Assuming 'phone' is the key for the phone number
        const customerName = bodyObject.customer && bodyObject.customer.first_name;
        const amount = bodyObject.total_price;
        const orderItems = bodyObject.line_items.map(item => {
          const title = `1x ${item.title}`;
          const variantTitle = item.variant_title ? `--> Variant: ${item.variant_title}` : ''; // Check if variant_title exists
          return `${title}${variantTitle}`; // Concatenate title and variant
        }).join(', ') 
        console.log('Phone number:', phoneNumber1);
        console.log('Customer name:', customerName);
        console.log('Amount:', amount);
        console.log('Order items:', orderItems);
        
        if (phoneNumber1) {
          await sendMessageUsingTemplate(phoneNumber1, customerName, orderItems, amount);
        } else {
          console.log('Phone number not found in the order.');
        }
      } catch (error) {
        console.error('Error processing order:', error.message);
      }

    res.sendStatus(200);
  } else {
    console.log('Danger! Not from Shopify!');
    res.sendStatus(403);
  }
});

app.listen(port, '0.0.0.0', () => console.log(`App listening on port ${port}!`));
