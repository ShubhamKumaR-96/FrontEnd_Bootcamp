const API_KEY = "368665fea866d4db85bf761cba291c9e";

const DAYS_OF_WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sun"];

const getCurrentWeatherData = async () => {
  const city = "chandigarh";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  return response.json();
};

const getHourlyForecast = async ({ name: city }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data.list?.map((forecast) => {
    const {
      main: { temp, temp_max, temp_min },
      dt,
      dt_txt,
      weather: [{ description, icon }],
    } = forecast;
    return { temp, temp_max, temp_min, dt, dt_txt, description, icon };
  });
};

const formatTemperature = (temp) => `${temp?.toFixed(1)}°`;
const createIconUrl = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const loadCurrentForecast = ({
  name,
  main: { temp, temp_max, temp_min },
  weather: [{ description }],
}) => {
  const currentForecastElement = document.querySelector("#current-forecast");
  currentForecastElement.querySelector(".city").textContent = name;
  currentForecastElement.querySelector(".temp").textContent = temp;
  currentForecastElement.querySelector(".description").textContent =
    description;
  currentForecastElement.querySelector(
    ".high_low"
  ).textContent = `H : ${formatTemperature(temp_max)}  L: ${formatTemperature(
    temp_min
  )}`;
};

const loadHourlyForecast = ({main:{temp:tempNow},weather:[{icon:iconNow}]},hourlyForecast) => {
  console.log(hourlyForecast);
   
  const timeForMatter=Intl.DateTimeFormat("en",{
    hour12:true,hour:"numeric"
  })


  let dataFor12Hours = hourlyForecast.slice(2, 14);
  const hourlyContainer = document.querySelector(".hourly-container");
  let innerHTMLString = `<article>
          <h3 class="time">Now</h3>
          <img class="icon" src="${createIconUrl(iconNow)}" alt="icon">
          <p class="hourly-temp">${formatTemperature(tempNow)}</p>
        </article>`

  for (let { temp, icon, dt_txt } of dataFor12Hours) {
    innerHTMLString += `<article>
          <h3 class="time">${timeForMatter.format(new Date(dt_txt))}</h3>
          <img class="icon" src="${createIconUrl(icon)}" alt="icon">
          <p class="hourly-temp">${formatTemperature(temp)}</p>
        </article>`;
  }
  hourlyContainer.innerHTML = innerHTMLString;
};

const calculateFiveDayForecast = (hourlyForecast) => {
  let dayWiseForecast = new Map();
  for (let forecast of hourlyForecast) {
    const [date] = forecast.dt_txt.split(" ");
    const daysofWeek = DAYS_OF_WEEK[new Date(date).getDay()];
    console.log(daysofWeek);
    if (dayWiseForecast.has(daysofWeek)) {
      let forecastForTheDay = dayWiseForecast.get(daysofWeek);
      forecastForTheDay.push(forecast);
      dayWiseForecast.set(daysofWeek, forecastForTheDay);
    } else {
      dayWiseForecast.set(daysofWeek, [forecast]);
    }
  }
  console.log(dayWiseForecast);
  for (let [key, value] of dayWiseForecast) {
    let temp_min = Math.min(...Array.from(value, (val) => val.temp_min));
    let temp_max = Math.max(...Array.from(value, (val) => val.temp_max));

    dayWiseForecast.set(key, {
      temp_min,
      temp_max,
      icon: value.find((v) => v.icon).icon,
    });
  }
  console.log(dayWiseForecast);
  return dayWiseForecast;
};

const loadfiveDayForecast = (hourlyForecast) => {
  console.log(hourlyForecast);
  const dayWiseForecast = calculateFiveDayForecast(hourlyForecast);
  const container = document.querySelector(".five_day_foreacst_container");
  let dayWiseInfo = " ";
  Array.from(dayWiseForecast).map(
    ([day, { temp_max, temp_min, icon }], index) => {

      if(index <5){
      dayWiseInfo += `<article class="day_wise_forecast">
          <h3>${index === 0 ? "today" : day}</h3>
          <img class="icon" src=${createIconUrl(icon)} alt="icon">
          <p class="min-temp">${temp_min}</p>
          <p class="max-temp">${temp_max}</p>
        </article>`;
    }
  }
  )
  container.innerHTML=dayWiseInfo;
};

const loadFeelsLike = ({ main: { feels_like } }) => {
  let container = document.querySelector("#feels-like");
  container.querySelector(".feels-like-temp").textContent =
    formatTemperature(feels_like);
};

const loadHumidity = ({ main: { humidity } }) => {
  let container = document.querySelector("#humidity");
  container.querySelector(".humidity_feel").textContent = `${humidity}%`;
};

document.addEventListener("DOMContentLoaded", async () => {
  const currentWeather = await getCurrentWeatherData();
  loadCurrentForecast(currentWeather);

  const hourlyForecast = await getHourlyForecast(currentWeather);
  loadHourlyForecast(currentWeather,hourlyForecast);
  loadfiveDayForecast(hourlyForecast);
  loadFeelsLike(currentWeather);
  loadHumidity(currentWeather);
});
