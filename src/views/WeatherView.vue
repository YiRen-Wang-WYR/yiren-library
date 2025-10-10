<template>
    <div class="container">
      <h1>WEATHER APP</h1>
  
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button class="search-button" @click="searchByCity">Search</button>
      </div>
    </div>
  
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
  
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
  
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </template>
  
  <script>
  import axios from "axios";
  

  const apikey = "f12d903eaa5d479357a04fb40dab83ca";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
      };
    },
    computed: {
      // Since units=metric was added in the request, here we directly take °C
      temperature() {
        return this.weatherData ? Math.round(this.weatherData.main.temp) : null;
      },
      iconUrl() {
        if (!this.weatherData) return null;
        const icon = this.weatherData.weather[0].icon;
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
        // Pull the current weather through longitude and latitude
        async fetchCurrentLocationWeather() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
              await this.fetchWeatherData(url);
            });
          }
        },
  
        // Search by city name
        async searchByCity() {
          if (!this.city.trim()) return;
          const q = encodeURIComponent(this.city.trim());
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apikey}&units=metric`;
          await this.fetchWeatherData(url);
        },
  
        // general fetch function
        async fetchWeatherData(url) {
          try {
            const { data } = await axios.get(url);
            this.weatherData = data;
          } catch (error) {
            console.error("Error fetching weather data:", error);
            this.weatherData = null;
          }
        },
      },
  };
  </script>
  