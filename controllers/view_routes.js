const router = require('express').Router();
const User = require('../models/User');
const Article = require('../models/Article')

// Middleware
function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Homepage
router.get('/', (req, res) => {

  res.render('index', {
    isHome: true,
    isLoggedIn: req.session.user_id
  });
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard');

  res.render('login', {
    isLogin: true
  });
});


// Sign up Page
router.get('/register', (req, res) => {
  res.render('register', {
    isRegister: true
  });
});

// Sign up for submission
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const newUser = await User.create({
      email,
      password, 
      username
    });

    req.session.user_id = newUser.id;

    res.redirect('/dashboard'); 
  } catch (error) {
    console.error(error);
    res.redirect('/register'); // Redirect back to the sign-up page on error
  }
});



router.get('/entry', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id);

  res.render('entry', {
    email: user.email,
    username: user.username
  });
});


module.exports = router;