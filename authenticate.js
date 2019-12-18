const jwt = require('jsonwebtoken');
const config = require('./config/config');
const axios = require('axios');

exports.verifyUser = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token.startsWith('bearer') || token.startsWith('Bearer')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: err.name
        });
      } else {
        req.decoded = decoded;
        req.token = token;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

exports.verifyAdmin = (req, res, next, user) => {
  if (user.admin) {
    next();
  } else {
    const err = new Error('admin needed');
    next(err);
  }
};