const Customer = require('../models/Customer');

exports.config = async(req, res) =>{
     const VERIFY_TOKEN = process.env.WH_TOKEN;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
        } else {
        res.sendStatus(403); // Token mismatch
        }
    } else {
        res.sendStatus(400); // Missing params
    }
}

exports.handleMessage = async(req, res)=>{
  const body = req.body;

  // Example: Extract message text
  if (
    body.object === 'whatsapp_business_account' &&
    body.entry &&
    body.entry[0].changes &&
    body.entry[0].changes[0].value.messages
  ) {
    const message = body.entry[0].changes[0].value.messages[0];
    const from = message.from; // phone number of sender
    const msgBody = message.text?.body; // message content
    const name = body.entry[0].changes[0].value.contacts[0].profile.name; // sender's name if available
    
    const customer ={
      name:name,
      PhoneNo:from
    }
   
    await insertCustomer(customer);
  }

  res.sendStatus(200);
};

const insertCustomer = async(customer) =>
{
  try {
    await Customer.create(customer);
    // res.status(201).json({'message':'successfully added '});
  } catch (error) {
    // res.status(500).json({ error: 'Failed to create add customer' });
  }
    
}