const router = require('express').Router();

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

// Dashboard Page
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    isDashboard: true
  });
});


module.exports = router;
