//Scheduler runs the bot app at specified times. First it makes a call to the database, then runs bot. During downtime it prints a sleeping message

const {bot} = require('./App');

var d;

const timeout = (ms) => new Promise((res) => setTimeout(res, ms))
//Call to database here to get hours the code should run.
startHours=[13, 4, 12, 15, 19, 22];

//Call to database to get user information
const scheduler = async ()=>{
  while(true){
    d = new Date();
    for(var i=0; i<startHours.length; i++){
      if(startHours[i] === d.getHours()){
        await bot('salad_bar95', 'ironman8', 'dogs');
        d = new Date();
        console.log('Completed session at:', d);
      };
    };
    d = new Date();
    console.log('Sleeping:', d);
    await timeout(600000);
  };
};

scheduler();
