const db = require('../connection');

//========FETCH MENU ITEMS=======
// Render/fetches Menu items and displays on homepage
// const getMenuItems = () => {
//   return db.query('SELECT * FROM menu_item ORDER BY menu_item.id DESC;')
//     .then(data => {
//       const rows = data.rows;
//       for (let i = 0; i < rows.length; i++) {
//         console.log(`Price before parseFloat for ${rows[i].name}: '${rows[i].price}'`);
//         rows[i].price = parseFloat(rows[i].price);
//         console.log(`Price after parseFloat for ${rows[i].name}: '${rows[i].price}'`);
//       }
//       return rows;
//     });
// };


//======FOR ADMIN=========
// allows adim to add new menu items to the menu_item table
const addMenuItem = function (menuItem) {
  return db.query(`INSERT INTO menu_item (name, photo_url, description, price)
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [menuItem.name, menuItem.photo_url, menuItem.description, menuItem.price])
    .then((result) => {
      console.log(result.rows, 'creating menu item');
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

//=====GET MENU ITEM ID=======
// const getMenuItemById = (id) => {
//   return db.query('SELECT * FROM menu_item WHERE id = $1;', [id])
//     .then(data => {
//       const item = data.rows[0];
//       if (item) {
//         console.log(`Price before parseFloat: ${item.price}`);
//         item.price = parseFloat(item.price);
//         console.log(`Price after parseFloat: ${item.price}`);
//       }
//       return item;
//     });
// };


//====FOR ADMIN========
//updates menu item based on selected id
const updateMenuItem = function (id, menuItem) {
  return db.query(
    `
      UPDATE menu_item
      SET name = $1,
          photo_url = $2,
          description = $3,
          price = $4
      WHERE id = $5
      RETURNING *;
    `,
    [menuItem.name, menuItem.photo_url, menuItem.description, menuItem.price, id]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error('Error updating menu item:', err.message);
      throw err;
    });
};



const getMenuItems = () => {
  return db.query('SELECT * FROM menu_item ORDER BY menu_item.id DESC;')
    .then(data => {
      const rows = data.rows;
      for (let i = 0; i < rows.length; i++) {
        //console.log(`Price before parseFloat for ${rows[i].name}: '${rows[i].price}'`);
        // Remove the $ symbol before parsing
        rows[i].price = parseFloat(rows[i].price.replace('$', ''));
        console.log(`Price after parseFloat for ${rows[i].name}: '${rows[i].price}'`);
      }
      return rows;
    });
};

const getMenuItemById = (id) => {
  return db.query('SELECT * FROM menu_item WHERE id = $1;', [id])
    .then(data => {
      const item = data.rows[0];
      if (item) {
        //console.log(`Price before parseFloat for ${item.name}: '${item.price}'`);
        // Remove the $ symbol before parsing
        item.price = parseFloat(item.price.replace('$', ''));
        console.log(`Price after parseFloat for ${item.name}: '${item.price}'`);
      }
      return item;
    });
};









//====EXPORT THE FUNCTIONS=======
module.exports = { getMenuItems, addMenuItem, getMenuItemById, updateMenuItem };
