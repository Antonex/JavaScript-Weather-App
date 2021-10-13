const API_KEY = '82573e33e6a79102ceb5fc90d20c9070';
const searchBtn = document.getElementById('search');
const weatherDiv = document.querySelector('.weather');
const img = document.querySelector('.img');

//Search Button
searchBtn.addEventListener('click', () => {

  const city_name = document.getElementById('city-name').value;


  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${API_KEY}`;

  axios
    .get(URL)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        const box = `
  <div class="box">
    <p class="style">Weather: ${res.data.weather[0].description}</p>
    <p class="style">Wind Speed: ${res.data.wind.speed} MPH</p>
    <p class="style">Humidity: ${res.data.main.humidity}%</p>
    <p class="style">Temperature: ${res.data.main.temp}°F</p>
  </div>
        `
        const description = res.data.weather[0].description;

        weatherDiv.style.display = 'block';
        if (description == 'broken clouds') {
          img.src = '/icons/clouds.png';
          img.classList.add('active');
        } else if (description == 'clear sky') {
          img.src = '/icons/sunny.png';
          img.classList.add('active');
        } else if (description == 'few clouds') {
          img.src = '/icons/cloudy.png';
          img.classList.add('active');
        } else if (description === 'rain' || description === 'light rain') {
          img.src = '/icons/rainy.png';
          img.classList.add('active');
        } else if (description === 'thunderstom') {
          img.src = '/icons/storm.png';
          img.classList.add('active');
        } else if (description === 'haze') {
          img.src = '/icons/haze.png';
          img.classList.add('active');
        } else if (description === 'snow') {
          img.src = '/icons/snowfall.png'
          img.classList.add('active');
        } else if (description === 'overcast clouds') {
          img.src = '/icons/overcast.png'
          img.classList.add('active');
        } else if (description === 'scattered clouds') {
          img.src = '/icons/scattered-thunderstorms.png'
          img.classList.add('active');
        }
        weatherDiv.innerHTML = box;
      }
    })
    .catch(err => {
      if (err.isAxiosError === true) {
        weatherDiv.innerHTML = '';
        img.classList.remove('active');
       
        showAlert('City Not Found', 'alert alert-danger mt-2 mr-5 ml-5')
      }
    });
});

const showAlert = (message, className) => {
  clearAlert();

  const div = document.createElement('div');

  div.className = className;

  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.weather-container');


  container.insertBefore(div, weatherDiv);

  setTimeout(() => {
    clearAlert();
  }, 2000);
}

const clearAlert = () => {
  const notFoundAlert = document.querySelector('.alert');

  if (notFoundAlert) {
    notFoundAlert.remove();
  }
}