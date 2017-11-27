var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var userModel = mongoose.model('users', {
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
});

var hashtagModel = mongoose.model('hashtags', {
  email:{
    type: String,
    required: true
  },
  hashtags:{
    type: [String],
    default: []
  }
});

module.exports = {
  userModel,
  hashtagModel
};
