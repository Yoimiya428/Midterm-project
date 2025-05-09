const { Pool } = require('pg');
const db = require('../connection');

const getPhoneNumber = (userId) => {
  return db.query('SELECT name, contact_number FROM users WHERE id = $1', [userId])
  .then(res => res.rows[0])
  .catch(err => {
    console.error('Error fetching number:', err);
    throw err;
  });
};

module.exports = {getPhoneNumber};
