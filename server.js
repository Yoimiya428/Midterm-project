// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

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
const db = require('./db/connection');

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
  secret: secretKey,  //  Change this to a strong, random string!
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //  Set to true if using HTTPS
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const checkoutRoute = require('./routes/checkout');

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


app.use(session({
  secret: 'top secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60 * 1000 }
}));




const summaryRoutes = require('./routes/order-summary');
app.use('/order-summary', summaryRoutes);


app.get('/checkout', (req, res) => {
  res.render('checkout', { message: null });
});

// const checkoutRoutes = require('./routes/checkout');
// app.use('/checkout', checkoutRoutes);

app.post('/checkout', (req, res) => {
  const orderNumber = Math.floor(Math.random() * 10000);
  const cart = temporaryCart;

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  req.session.order = {
    orderNumber,
    totalPrice: totalPrice.toFixed(2),
  };

  temporaryCart.length = 0;

  res.redirect('/order-summary');
});


const temporaryCart = [];

app.post('/add-to-cart', (req, res) => {
  const itemId = parseInt(req.body.itemId);

  getMenuItemById(itemId)
    .then(item => {
      if (!item) return res.status(404).send('Item not found');


      const existing = temporaryCart.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;  // If the item is already in the cart, increase its quantity
      } else {

        temporaryCart.push({ ...item, quantity: 1 });
      }

      res.redirect('/');
    })
    .catch(err => {
      console.error("Add-to-cart error:", err);
      res.status(500).send("Server error");
    });
});


app.get('/', (req, res) => {
  getMenuItems()
    .then(menuItems => {

      menuItems.forEach(item => {
        item.price = parseFloat(item.price);
      });

      const cart = temporaryCart;

      let total = 0;
      let itemCount = 0;

      for (const item of cart) {
        console.log(`Calculating: ${item.name}, price: ${item.price}, qty: ${item.quantity}`);
        total += item.price * item.quantity;
        itemCount += item.quantity;
      }

      const cartTotal = !isNaN(total) ? total : 0;

      res.render('index', {
        menu: menuItems,
        cart,
        cartItemCount: itemCount,
        cartTotal: cartTotal,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error loading menu");
    });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});




















