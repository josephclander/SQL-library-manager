var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(
  '/',
  // () => {
  //   throw new Error();
  // }
  // async (req, res) => {
  //   const books = await Book.findAll();
  //   console.log(books);
  //   res.json(books);
  // }
  (req, res, next) => {
    res.redirect('/books');
  }
);

module.exports = router;
