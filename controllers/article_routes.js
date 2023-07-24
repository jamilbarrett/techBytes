require("dotenv").config();
const router = require('express').Router();
const User = require('../models/User');
const Article = require('../models/Article')

// Middleware
function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}


router.post('/entry', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const newEntry = req.body.entry;
    const newTitle = req.body.title.toUpperCase();



    Article.create({ userId: user.id, title: newTitle, entry: newEntry});
    // redirect them after the data is obtained
    res.redirect('/artilce');

  } 
  catch (err) {
    console.log(err);
  }

});

router.delete('/entry/:id', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: Article
    });

    const articleId = req.params.id;
    const article = await Article.findOne({
      where: {
        id: moodId,
        userId: user.id
      }
    });

    if (!article) {
      return res.status(404).send('Article not found');
    }

    // Delete the Article entry from the database
    await article.destroy();

    console.log("Got into the delete route");
    // Redirect to the Article page
    console.log('Response status:', res.statusCode);
    console.log('Response headers:', res.getHeaders());

    res.redirect('/dashboard');

    console.log("redirect?");
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
