
let searchBar=document.getElementById("search-bar"),
    today=document.getElementById("today"),
    todayDate=document.getElementById("today-date"),
    cityLocation=document.getElementById("location"),
    todayDegree=document.getElementById("today-degree"),
    todayIcon=document.getElementById("today-icon"),
    todayDescription=document.getElementById("today-description"),
    humidty=document.getElementById("humidty"),
    wind=document.getElementById("wind"),
    compass=document.getElementById("compass"),
    monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",],
     
    finalResult=[];

    /*************************next Day**********************/
    let nextDay=document.getElementsByClassName("nextDay"),
    nextDayIcon=document.getElementsByClassName("nextDay-icon"),
    maxDegree=document.getElementsByClassName("max-degree"),
    minDegree=document.getElementsByClassName("min-degree"),
    nextDayDescription=document.getElementsByClassName("nextDay-description");
    /*************************Get Weather Data From Api**********************/
async function getWeatherData(currentCity="cairo"){
   let apiResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6d9eee0d8a6942aaa94233332232907&q=${currentCity}&days=3`)
   finalResult=await apiResponse.json();
   console.log(finalResult)
   displayTodayWeather();
   displayNextDayWeather();
}
    /*************************Display Today Weather**********************/
 function displayTodayWeather(){
    const date = new Date();
    today.innerHTML=days[date.getDay()];
    todayDate.innerHTML=`${date.getDate()} ${monthName[date.getMonth()]}`
    cityLocation.innerHTML=finalResult.location.name;
    todayDegree.innerHTML=finalResult.current.temp_c;
    todayIcon.setAttribute('src',`https:${finalResult.current.condition.icon}`);
    todayDescription.innerHTML=finalResult.current.condition.text;
    humidty.innerHTML = finalResult.current.humidity;
    wind.innerHTML = finalResult.current.wind_kph;
    compass.innerHTML =finalResult.current.wind_dir;

}
/*************************Display Next Weather**********************/
function displayNextDayWeather(){
for(let i=0;i<nextDay.length;i++){//text
  nextDay[i].innerHTML=days[new Date(finalResult.forecast.forecastday[i+1].date).getDay()];
  nextDayIcon[i].setAttribute('src',`https:${finalResult.forecast.forecastday[i+1].day.condition.icon}`);
  maxDegree[i].innerHTML=finalResult.forecast.forecastday[i+1].day.maxtemp_c;
  minDegree[i].innerHTML=finalResult.forecast.forecastday[i+1].day.mintemp_c;
  nextDayDescription[i].innerHTML=finalResult.forecast.forecastday[i+1].day.condition.text;
  console.log(finalResult.forecast.forecastday[i+1].day.condition.text);
}
}

/*************************Search City**********************/

searchBar.addEventListener("keyup",function(){
    currentCity= searchBar.value;
  getWeatherData(currentCity);
  })

  getWeatherData()

