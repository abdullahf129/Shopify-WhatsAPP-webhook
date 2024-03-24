# WhatsApp Order Notifications
Elevate your customer experience with WhatsApp Order Notifications. This Node.js service seamlessly integrates with Shopify, providing real-time order updates via WhatsApp. It's efficient, secure, and keeps your customers informed at every step of their purchase journey.

Features
Seamless Shopify Integration: Automatically notifies customers about new orders.
Secure Verification: Uses HMAC SHA256 to ensure authenticity.
Direct WhatsApp Notifications: Sends order details directly to customers on WhatsApp.
Flexible Message Formats: Supports both template and custom text messages.
Getting Started
Follow these simple steps to get your service running:

**Prerequisites**

Node.js and npm
A Shopify account
Facebook Business account with WhatsApp API access
Axios (npm install axios)

**Setup**

**Clone the Repository**

git clone https://github.com/abdullahf129/whatsapp-order-notification-service.git

**Install Dependencies**

npm install
Configure Environment Variables

Add your Shopify secret key and Facebook Graph API access token to your environment.

**Running the Service**
Start the service with:


npm start
It will listen for Shopify webhook requests on /webhooks/orders/create.

**Deployment**
Deploy on any Node.js compatible hosting service, ensuring environment variables are set.

**Usage**
Configure a Shopify webhook for order creation to point to your service. When a new order is made, the service validates it, crafts a message, and sends a WhatsApp notification to the customer.

Contributing
Feel free to fork, modify, or contribute to this project. Your input is welcome!
