var express = require('express');
var router = express.Router();

router.get('/health', (req, res) => { 
  return res.status(200).json({
    status: 'success',
    message: 'MewCat API is healthy.'
  });
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req, res, next) => {
  console.log(req.query, '---req');
  res.render('home', {
    title: 'User',
    name: 'MewCat Bot',
    desc: 'Mew mew...'
   });
});

module.exports = router;
