const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/checkout', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber || phoneNumber.length !== 10) {
    return res.status(400).json({ message: 'Invalid phone number! Please try again!' });
  }


  db.query(`SELECT * FROM users WHERE contact_number = $1;`, [phoneNumber])
  .then(userSelected => {
    if (userSelected.rows.length > 0) {
      return userSelected.rows[0];
    }

    return db.query(
      `INSERT INTO users (contact_number) VALUES ($1) RETURNING *;`,
      [phoneNumber]
    ).then(newUser => newUser.rows[0]);
  })
  .then(user => {
    return db.query(
      `INSERT INTO orders (user_id, total_price, order_time) VALUES ($1, 0, now()) RETURNING *;`,
      [user.id]
    );//set the price to be 0 for now, then revise it to capture the price of the items in the cart
  })
  .then(orderDetails => {
    const newOrder = orderDetails.rows[0];
    res.redirect(`/orders/${newOrder.id}`);
  })
  .catch(err => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Sorry, there is an error encountered during checkout, please try again.' });
  });
});


module.exports = router;
