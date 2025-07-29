const axios = require('axios');

exports.sendWhatsAppMessage = async(phone, message)=> {
  const data = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'text',
    text: { body: message },
  };

  await axios.post('https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages', data, {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};