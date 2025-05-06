const db = require('../connection');

const getMenuItems = () => {
  return db.query('SELECT * FROM menu_item;')
 .then(data => {
  return data.rows
});
 }

 module.exports = { getMenuItems};
