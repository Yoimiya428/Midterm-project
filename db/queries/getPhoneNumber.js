const { Pool } = require('pg');
const db = require('../connection');

const getPhoneNumber = (userId) => {
  return db.query('SELECT contact_number FROM users WHERE id = $1', [userId])
  .then(res => res.rows[0]?.contact_number)
  .catch(err => {
    console.error('Error fetching number:', err);
    throw err;
  });
};

module.exports = {getPhoneNumber};
