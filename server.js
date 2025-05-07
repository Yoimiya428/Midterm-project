// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
//const router  = express.Router();
const {
  getMenuItems,
  addMenuItem,
  getMenuItemById,
  updateMenuItem,
} = require('./db/queries/menu_items');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`


app.get('/', (req, res) => {
  getMenuItems()
    .then(menuItems => {
      //res.json({ menuItems });
      res.render('index', { menu: menuItems });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/admin/menu', (req, res) => {
  getMenuItems()
    .then(menuItems => {
      res.render('admin_menu', { menu: menuItems });
    });
});

app.get('/admin/menu/update/:id', (req, res) => {
  const itemId = req.params.id;
  getMenuItemById(itemId)
    .then((menuItem) => {
      if (!menuItem) {
        return res.status(404).send('Menu item not found');
      }
      res.render('admin_update_menu', { item: menuItem });
    })
    .catch((error) => {
      console.error('Error fetching menu item for edit:', error);
      res.status(500).send('Internal Server Error');
    });
});


//====ALL POSTs METHODS HERE=====
app.post('/admin', (req, res) => {
  const { name, photo_url, description, price } = req.body;

  if (!name || !description || price === undefined || price < 0) {
    return res.status(400).json({ message: "Invalid data.  Name, description, and a non-negative price are required." });
  }

  const newMenuItem = {
    name,
    photo_url,
    description,
    price
  };

  addMenuItem(newMenuItem)
    .then(insertedMenuItem => {
      res.status(201).json({ message: 'New menu items successfully added ', item: insertedMenuItem });
    })
    .catch(error => {
      console.error("Error in adding menu item:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    });
});

app.post('/admin/menu/update/:id', (req, res) => {
  const itemId = req.params.id;
  const { name, photo_url, description, price } = req.body;

  if (!name || !description || price === undefined || isNaN(price) || price < 0) {
    return res.status(400).json({ message: "Invalid data: Name, description, and a non-negative price are required to continue" });
  }

  const updatedMenuItemData = {
    name,
    photo_url,
    description,
    price: parseFloat(price),
  };

  updateMenuItem(itemId, updatedMenuItemData)
    .then((updatedMenuItem) => {
      if (!updatedMenuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.redirect('/admin/menu');
    })
    .catch((error) => {
      console.error('Error updating menu item:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    });
});





//newly added

const summaryRoutes = require('./routes/order-summary');
app.use('/order-summary', summaryRoutes);


app.get('/checkout', (req, res) => {
  res.render('checkout', { message: null });
});

// const checkoutRoutes = require('./routes/checkout');
// app.use('/checkout', checkoutRoutes);

app.post('/checkout', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="1;url=/order-summary" />
        <script>
          setTimeout(() => {
            window.location.href = '/order-summary';
          }, 1000);
        </script>
        <title>Redirecting</title>
      </head>
      <body>
        <p>Thank you for your order! Redirecting to order summary...</p>
      </body>
    </html>
  `);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
