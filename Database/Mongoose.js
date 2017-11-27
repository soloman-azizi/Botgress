var mongoose = require('mongoose');

var {userModel, hashtagModel} = require('./Models');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Botgress');

// var userModel = mongoose.model('User', {
//   email:{
//     type: String
//   },
//   password:{
//     type: String
//   },
// });


const addUser = (user)=>{
  var newUser = new userModel({
    email: user.email,
    password: user.password
  });

  newUser.save().then((doc)=>{
    console.log(`Added ${newUser.email}`);
  }, (err)=>{
    console.log(`Unable to add user ${newUser.email}`);
  });
};

// const getUser = (user)=>{
//
// };

// addUser({
//   email: 'test',
//   password: 'test2'
// });
const addHashtag = (user, hashtag)=>{

  user.hashtags.push(hashtag);
  var newHashtag = new hashtagModel({
    email: user.email,
    hashtags: user.hashtags
  });

  console.log(newHashtag.hashtags)

  newHashtag.save().then((doc)=>{
    console.log(`Added ${newHashtag.hashtags[newHashtag.hashtags.length-1]}`);
  }, (err)=>{
    console.log(`Unable to add hashtag ${newHashtag.hashtags[newHashtag.hashtags.length-1]}`);
  });
};

// addHashtag({
//   email: 'salad_bar95',
//   hashtags: []
// }, 'dogs');

module.exports = {
  mongoose
};
