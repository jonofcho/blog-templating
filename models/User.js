var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
})

const User = module.exports = mongoose.model('User' , userSchema);
