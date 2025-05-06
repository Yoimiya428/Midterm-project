require('dotenv').config();
const { getPhoneNumber } = require('../db/queries/getPhoneNumber.js')

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (body, phoneNumber) => {
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

getPhoneNumber(6) //user id will be passed as a parameter here
  .then(user => {
    console.log('User info:', user);

  sendSMS(`Hey ${user.name}, your order will be ready in xx minutes!`, user.contact_number);

  setTimeout(() => {
    sendSMS(`Hey ${user.name}, your order is ready to pick up!`, user.contact_number);
  }, 10000);

  })
  .catch(err => {
    console.error('Could not send SMS', err.message);
  });
