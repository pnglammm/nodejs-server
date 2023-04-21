const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  // brand: {
  //   type: String,
  //   require: true
  // },
  // category: {
  //   type: String,
  //   require: true
  // },
  image: {
    type: String,
    require: true
  },
  cloudinary_id: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Product', productSchema);