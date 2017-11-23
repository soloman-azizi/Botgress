const webDriver = require('selenium-webdriver'),
  By = webDriver.By,
  until = webDriver.until;



const timeout = (ms) => new Promise((res) => setTimeout(res, ms))

const bot = async (userName, passWord, hashTag)=>{
  var liked = 0, commented = 0, followed = 0, post = 1, exception = 0;

  var driver = new webDriver.Builder()
    .forBrowser('chrome')
    .build();

  await driver.get('http://www.instagram.com');

  //Click to get onto log in page
  await driver.findElement(By.linkText('Log in')).click();

  //Enter username and password
  var userNameElem = await driver.findElement(By.name('username'));
  userNameElem.clear();
  userNameElem.sendKeys(userName);

  var passwordElem = await driver.findElement(By.name('password'));
  passwordElem.clear();
  passwordElem.sendKeys(passWord);

  //Click the log in button and go to home page
  await driver.findElement(By.xpath('//form[1]/span/button')).click();
  await timeout(4000); //Delay to make sure user logs in

  //Get current number of followers
  // await driver.get('http://www.instagram.com/salad_bar95')
  // var currentFollowers = await driver.findElement(By.xpath('//ul/li[2]/a/span')).text;
  // console.log(currentFollowers);

  //Find the search bar and search for a #hashtag
  await driver.findElement(By.className('_96n9j')).click();
  var searchElem = await driver.findElement(By.xpath('//nav/div[2]/div/div/div[2]/input'));
  searchElem.sendKeys('#', hashTag);
  await timeout(5000);
  await driver.findElement(By.className('_t3f9x')).click();

  //Find the first search result
  try{
    await timeout(5000);
    await driver.findElement(By.xpath('//article/div[2]/div/div/div/a')).click();

    //Find the like, comment, and next buttons
    await timeout(3000);
    var likeElem = await driver.findElement(By.linkText('Like'));
    var nextElem = await driver.findElement(By.linkText('Next'));
    var commentElem = await driver.findElement(By.xpath('//form[1]/textarea'));

    //Scroll through posts, liking some
    for(var i=0; i<5; i++){
      likeElem.click();
      liked++;
      nextElem.click();
      console.log(`Liked: ${liked}\nPosts: ${post}`)
      post++;

      await timeout(3000);
    };
  }catch(e){
    console.log('Error: Unable to interact with post');
  };
  driver.quit();
};

//bot('salad_bar95', 'ironman8', 'dogs');

module.exports = {
  bot
}
