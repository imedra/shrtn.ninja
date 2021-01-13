const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "An ID is required."
  },
  url: {
    type: String,
    required: "A URL is required."
  },
}, 
);

module.exports = mongoose.model('Url', urlSchema);
