var weather = require('openweather-apis');
// check http://openweathermap.org/appid#get for get the APPID
const ownKey = '34e949905f94ab1497b8cd506d36656e';
weather.setAPPID(ownKey);
   
weather.setLang('en');
      
weather.setUnits('metric');


// exports.getWeather = function(city){
//     weather.setCity(city);
//     weather.getAllWeather(function(err, JSONObj){
//         if(err){
//             console.log('error:', error);
//           } else {
//         console.log(JSONObj);}
//     });
// };

module.exports = weather;
