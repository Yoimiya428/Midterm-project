const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  const orderId = req.params.id;

  db.query(`
    SELECT orders.id AS order_number, 
           total_price, 
           order_time, 
           ready_time, 
           (ready_time - order_time) AS wait_time
    FROM orders
    WHERE orders.id = $1;
  `, [orderId])
    .then(result => {

      const order = result.rows[0];
      //set the status as "in progress" for now, and then change
      const status = "in progress";

      res.render('order_summary', {
        orderNumber: order.order_number,
        totalPrice: order.total_price,
        status,
        waitTime: order.wait_time
      });
    })

});

module.exports = router;
