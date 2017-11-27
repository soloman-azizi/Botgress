//Scheduler runs the bot app at specified times. First it makes a call to the database, then runs bot. During downtime it prints a sleeping message
const {bot} = require('./App');
const {userModel, hashtagModel} = require('./../Database/Models');
var d;

const timeout = (ms) => new Promise((res) => setTimeout(res, ms))
//Call to database here to get hours the code should run.
startHours=[1, 4, 12, 15, 19, 22];

//Call to database to get user information


var userHashtag = userModel.find({
  email: 'salmabarheem@gmail.com'
});

const userDetails = async (email)=>{

  var user = {}

  var userResult = await userModel.findOne({
    email: 'salmabarheem@gmail.com'
  });
  user.email = userResult.email;
  user.password = userResult.password;

  var hashtagResult = await hashtagModel.findOne({
    email: 'salmabarheem@gmail.com'
  });
  user.hashtag = hashtagResult.hashtags[0];

  return user;
};

userDetails('salmabarheem@gmail.com');

//Check scheduler
const scheduler = async (user)=>{
  while(true){
    d = new Date();
    for(var i=0; i<startHours.length; i++){
      if(startHours[i] === d.getHours()){
        await bot(user);
        d = new Date();
        console.log('Completed session at:', d);
      };
    };
    d = new Date();
    console.log('Sleeping:', d);
    await timeout(600000);
  };
};

scheduler(user);
