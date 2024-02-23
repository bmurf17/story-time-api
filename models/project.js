var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
});
var project = new mongoose.model('Project', schema);

module.exports = project;
