//Scheduler runs the bot app at specified times. First it makes a call to the database, then runs bot. During downtime it prints a sleeping message

const {bot} = require('./App');

var d;
//Call to database here to get hours the code should run.
startHours=[1, 4, 12, 15, 19, 22];

//Call to database to get user information

while(true){
  d = new Date();
  for(var i=0; i<startHours.length; i++){
    if(startHours[i] === d.getHours()){
      bot('salad_bar95', 'ironman8', 'dogs');
      d = new Date();
      console.log('Completed session at:', d);
    };
  };
  d = new Date();
  console.log('Sleeping:', d);
  
};
