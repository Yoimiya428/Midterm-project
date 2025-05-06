/* const db = require('../connection');

const getAdminMenuItems = () => {
  return db.query('SELECT * FROM menu_item;')
 .then(data => {
  return data.rows
});
 }

 const addMenuItem = function (menuItem) {
  return pool
    .query(
      `INSERT INTO menu_item (name, photo_url, description, price)
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [menuItem.name, menuItem.photo_url, menuItem.description, menuItem.price]
    )
    .then((result) => {
      console.log(result.rows, 'creating menu item');
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err; // Re-throw the error so the caller can handle it
    });
};

 module.exports = { getAdminMenuItems };
 */
