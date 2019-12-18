const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});


const Product = mongoose.model('product', productSchema);

module.exports = Product;