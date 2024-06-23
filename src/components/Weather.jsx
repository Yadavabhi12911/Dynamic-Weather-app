import React, { useEffect, useState, useRef } from "react";
import search_bar from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import rain from "../Assets/rain.png";
import drizzle from "../Assets/drizzle.png";
import wind from "../Assets/wind.png";
import snow from "../Assets/snow.png";
import humidity from "../Assets/humidity.png";

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Malerkotla");
  }, []);

  return (
    <div className="weather  place-self-center p-10 rounded-[10px] flex flex-col items-center bg-neutral-900 " >
      <div className="search-bar flex items-center gap-3">
        <input
          className="h-[50px] border-none outline-none rounded-[40px] pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]"
          ref={inputRef}
          type="text"
          placeholder="Search"
        />
        <img
          className="w-12 p-4 rounded-full bg-[#ebfffc] cursor-pointer"
          src={search_bar}
          alt="Search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData && (
        <>
          <img className="weather-img w-[150px] mx-8" src={weatherData.icon} alt="Weather Icon" />
          <p className="temperature text-[#fff] text-[80px] leading-[1]">{weatherData.temperature}°c</p>
          <p className="location text-[#fff] text-[40px] ">{weatherData.location}</p>
          <div className="weather-data w-full mt-10 text-[#fff] flex justify-between">
            <div className="col flex items-start gap-3 text-[22px]">
              <img className="img-tag w-[26px] mt-[10px]" src={humidity} alt="Humidity Icon" />
              <div>
                <p className="hum-per">{weatherData.humidity}%</p>
                <span className="hum-txt block text-[16px]">Humidity</span>
              </div>
            </div>
            <div className="col flex items-start gap-3 text-[22px]">
              <img className="w-[26px] mt-[10px]" src={wind} alt="Wind Speed Icon" />
              <div>
                <p className="hum-per">{weatherData.windSpeed} Km/h</p>
                <span className="hum-txt block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
