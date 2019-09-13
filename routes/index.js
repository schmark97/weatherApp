var express = require('express');
var router = express.Router();
var weather = require('../weather/weather.js')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { temp: null });  
});


router.post('/', function(req, res) {
  weather.setCity(req.body.city);
  weather.getWeatherForecast(function(err, JSONObj){
        if(err){
          res.render('error', {status: JSONObj.cod});  
          } else {
            let entries = [0, 0, 0, 0, 0, 0];
            let ind = 0;
            let dateArray = [];
            let hourArray = [];
            let tempArray = [];
            let iconArray = [];
            let descriptionArray = [];
            entries[0] = 1;
            if(JSONObj.cod === '200'){
              JSONObj.list.forEach((listItem, index) => {
                  let date = new Date(listItem.dt_txt);
                  dateArray[index] = "";
                  let splitedDate = date.toString().split(' ');
                  hourArray.push(splitedDate[4]);
                  for(j = 0; j < 4; j++){
                    dateArray[index] += splitedDate[j] + " ";
                  }
                  if(index > 0){
                    if(dateArray[index] != dateArray[index-1]) ind++;
                    entries[ind]++
                  }
                  tempArray.push(Math.round(listItem.main.temp));
                  iconArray.push(listItem.weather[0].icon);
                  descriptionArray.push(listItem.weather[0].description);
              });
              res.render('weather', {entries: entries, hours: hourArray, dates : dateArray, temp: tempArray, icons: iconArray, 
                descriptions : descriptionArray});
            }
            else{
              res.render('error', {status: JSONObj.cod});  
            }
      }    
      });


 
});

module.exports = router;
