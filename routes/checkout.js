const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const sendSMS = require('../utils/sendSMS');

router.get('/', (req, res) => {
  res.render('checkout');
});

router.post('/', (req, res) => {
  console.log('form data', req.body);
  const { customer, enterNumber } = req.body;

  const query1 = `
    INSERT INTO users (name, contact_number)
    VALUES ($1, $2)
    RETURNING *;
  `;

  db.query(query1, [customer, enterNumber])
    .then(result => {
      const user = result.rows[0];
      console.log('Saved number:', user);

      sendSMS(`Hey ${user.name}, your order will be ready in xx minutes!`, user.contact_number);

      setTimeout(() => {
        sendSMS(`Hey ${user.name}, your order is ready to pick up!`, user.contact_number);
      }, 10000);

      res.send('order has been placed');
    })
    .catch(err => {
      console.error(err.message);

    });
});


module.exports = router;
