const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const authentication = require('../authenticate');
const axios = require('axios');
router.route('')
  .options((req, res) => res.sendStatus(200))
  .get(authentication.verifyUser, (req, res) => {
    Product.find({
        user: req.decoded._id
      })
      .then(products => {
        res.json(products);
      })
      .catch(err => console.log(err));
  })
  .post(authentication.verifyUser, (req, res) => {
    console.log(req.body);
    product = {
      ...req.body,
      'user': req.decoded._id
    };
    Product.create(product)
      .then(data => {
        res.json(data);
      });
  });

router.get('/all', authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${req.token}`
  };
  axios.get('http://localhost:4000/users/me')
    .then(user => {
      if (!user.admin) {
        res.status(401);
        res.json({
          'msg': 'Not allow : admin only'
        });
      }
      Product.find({})
        .then(products => {
          res.json(products);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;