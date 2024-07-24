const locationBtn = document.getElementById('getLocation');

async function getWeather() {

    try {
        const apiKey = '8f60ab1099ff1793ae01688cd43b48ee';
        const userLocation = document.getElementById('LocationInput').value;

        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${userLocation}&APPID=${apiKey}&units=metric`
        const response = await fetch(apiUrl);

        if (userLocation === ''){
            alert('Input location to fetch weather forecast');
        }
        
        if (!response.ok) {
            throw new Error('Error fetching Data');   
        }
        
        const data = await response.json();
        console.log(data)

        const degCelsius = document.getElementById('degreeCelsius');
        const clouds = document.getElementById('clouds');
        const location = document.getElementById('currentLocation');
        const highPressure = document.querySelector('.H');
        const lowPressure = document.querySelector('.L');

        const mainTemp= data.main.temp;
        const roundUpTemp = Math.ceil(mainTemp) + '°';
        degCelsius.innerHTML = roundUpTemp;
        highPressure.innerHTML = 'H: ' + roundUpTemp;
        lowPressure.innerHTML = 'L: ' + roundUpTemp;


        const weatherDescription = data.weather[0].description;
        const word = weatherDescription.split(' ');
        const capitalizeFl = word.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        
        const cloudsDescription = capitalizeFl.join(' ');

        clouds.textContent = cloudsDescription;
        location.innerHTML = data.name + ', ' + data.sys.country;
    }
    catch(error) {
        console.error(error);
    }
}

locationBtn.addEventListener('click', getWeather);
