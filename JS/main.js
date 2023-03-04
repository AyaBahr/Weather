const d = new Date()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = months[d.getMonth()];
let day = weekday[d.getDay()]

// console.log(d);
document.getElementById('search').addEventListener("keyup" , function (e) {
    weather(e.target.value)
})

weather("Egypt");
async function weather(location) {
    let myResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=18b6608c71e64e65bbc145353232102&q=${location}&days=3`);
    let final = await myResponse.json()
    console.log(final);
    displayCurrent(final.location, final.current);
    displayTomorrow(final.forecast.forecastday)
}

function displayCurrent(l , c) {
    let todayWeather = `
 <div class="today forecast">
 <div class="forecast-header" id="today">
     <div class="day">${day}</div>
     <div class=" date">${d.getDate() + month}</div>
 </div>
 <div class="forecast-content" id="current">
     <div class="location">${l.name}</div>
     <div class="degree">
         <div class="num">${c.temp_c}<sup>o</sup>C</div>

         <div class="forecast-icon">
             <img src="https:${c.condition.icon}" alt="" width="90">
         </div>

     </div>
     <div class="custom">${c.condition.text}</div>
     <span><img src="images/icon-umberella@2x.png" alt="">${c.humidity}%</span>
     <span><img src="images/icon-wind@2x.png" alt="">${c.wind_kph}</span>
     <span><img src="images/icon-compass@2x.png" alt="">${c.wind_dir}</span>
 </div>
</div>
    `
    document.getElementById('forecast').innerHTML = todayWeather;
}
//${}
function displayTomorrow(f) {
    let cartona = ""
    for (let i = 1; i < f.length; i++) {
        cartona = `
        <div class="forecast">
        <div class="forecast-header">
            <div class="day">${weekday[new Date(f[i].date).getDay()]}</div>
        </div>
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${f[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${f[i].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${f[i].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${f[i].day.condition.text}</div>
        </div>
    </div>

        `
        document.getElementById('forecast').innerHTML += cartona;
    }
}

