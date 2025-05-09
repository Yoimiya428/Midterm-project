const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// router.get('/:id', (req, res) => {
//   const orderId = req.params.id;

//   db.query(`
//     SELECT id,
//            total_price,
//            order_time,
//            ready_time,
//            (ready_time - order_time) AS wait_time
//     FROM orders
//     WHERE id = $1;
//   `, [orderId])
//     .then(result => {

//       const order = result.rows[0];
//       //set the status as "in progress" for now, and then change
//       const status = "in progress";

//       let waitTime = order.wait_time;
//       if (!waitTime) {
//         waitTime = { minutes: 10 };
//       }

//       res.render('order_summary', {
//         orderNumber: order.id,
//         totalPrice: order.total_price,
//         status,
//         waitTime
//       });
//     })

// });


router.get('/', (req, res) => {
  res.render('order-summary', {
    orderNumber: 1234,  // hardcoded order number for demo
    totalPrice: 50.00,  // hardcoded total price for demo
    status: 'Processing',  // hardcoded status for demo
    waitTime: { minutes: 10 }  // hardcoded wait time for demo
  });
});

module.exports = router;
