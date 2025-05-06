const db = require('../connection');

const getAdminMenuItems = () => {
  return db.query('SELECT * FROM menu_item;')
 .then(data => {
  return data.rows
});
 }

 module.exports = { getAdminMenuItems };
