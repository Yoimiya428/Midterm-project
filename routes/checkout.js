const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/checkout', async (req, res) => {
  const { phoneNumber, userName } = req.body;

  if (!phoneNumber || phoneNumber.length !== 10) {
    return res.render('checkout', { message: 'Invalid phone number!' });
  }

  try {
    const userResult = await db.query(
      `SELECT * FROM users WHERE contact_number = $1;`,
      [phoneNumber]
    );

    let user;
    if (userResult.rows.length > 0) {
      user = userResult.rows[0];
    } else {
      const insertUser = await db.query(
        `INSERT INTO users (name, contact_number) VALUES ($1, $2) RETURNING *;`,
        [userName || 'Guest', phoneNumber]
      );
      user = insertUser.rows[0];
    }

    const newOrderResult = await db.query(
      `INSERT INTO orders (user_id, total_price, order_time, ready_time)
       VALUES ($1, 0, NOW(), NOW() + interval '30 minutes') RETURNING *;`,
      [user.id]
    );

    const newOrder = newOrderResult.rows[0];

    res.redirect(`/orders/${newOrder.id}`);

  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).render('checkout', { message: 'Server error. Please try again.' });
  }
});

module.exports = router;
