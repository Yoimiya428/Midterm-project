require('dotenv').config();
const { getPhoneNumber } = require('../db/queries/getPhoneNumber.js')

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (body, phoneNumber) => { //parameter 'body' will be replaced by number input from form
  const msgOptions = {
    from: process.env.TWILIO_PHONE,
    to: phoneNumber,
    body
  };
  client.messages
    .create(msgOptions)
    .then(message => {
      console.log('SMS sent to:', message.to);
    })
    .catch(error => {
      console.error('Failed to send SMS:', error.message);
    });
};

getPhoneNumber(3) //user id will be passed as a parameter here
  .then(phone => {
    sendSMS('Hey [Name], your order will be ready in xx minutes!', phone)
  })
  .catch(err => {
    console.error('Could not send SMS', err.message);
  });
