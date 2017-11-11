var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var articleSchema = mongoose.Schema({
  header:{
    type: String,
    required: true,
  },
  text:{
    type: String,
    required: true,
  },
  updatedDate:{
    type: String,
  },
  createdDate:{
    type: String,
  },
  createdBy:{
    type: String,
    required: true,
  },
  estimatedReadTime:{
    type: String,
    required: true,
  },
  views:{
    type: Number,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
  }]
})

const User = module.exports = mongoose.model('Article' , articleSchema);
