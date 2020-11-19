const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hello world');
  res.render('index', { title: 'Express' });
});

module.exports = router;