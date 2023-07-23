const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars')
const hbs = exphbs.create({extname: '.hbs'})
const session = require('express-session')
require('dotenv').config()
// const routes = require('./controllers');



// Import the db connection
const db = require('./config/connection');

// Import our routes
const user_routes = require('./controllers/user_routes.js')
const view_routes = require('./controllers/view_routes.js')

const app = express();
const PORT = process.env.PORT || 3333;


// Establishing hbs as a suffix
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Load Sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
  }
}));

// app.use(routes);
app.use("/", [user_routes, view_routes]);


// Database must sequelize before the server starts
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
