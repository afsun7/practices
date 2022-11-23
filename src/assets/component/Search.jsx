import axios from "axios";
import { useEffect, useState } from "react";
export default function Search() {
  const API_KEY = "10e500a2733b2361f1e74acf08b3cccc";
  const [city, setCity] = useState("tehran");
  const [input, setInput] = useState("");
  const [info, setinfo] = useState("");

  async function getWeather() {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=7`
      );
      setinfo(data);
    } catch {
      console.log("Error");
    }
  }
  function handelForm(e) {
    e.preventDefault();
  }
  function handelSearch(e) {
    setInput(e.target.value);
    setCity(e.target.value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      getWeather();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [city]);
  console.log(info);
  return (
    <div className="container">
      <form onSubmit={handelForm}>
        <input
          type="text"
          onChange={handelSearch}
          className="searchInput"
        ></input>
        {info ? (
          <div className="App-header">
            <div className="show">
              <span className="showCity">{info.city.name}</span>
              <span className="temperature">
                {Math.round(info.list[0].main.temp)}
              </span>
              <span className="showimg">
                <img
                  src={`http://openweathermap.org/img/wn/${info.list[0].weather[0].icon}@2x.png`}
                  alt=""
                />
              </span>
            </div>

            <div className="boxTow">
              <div className="showDetail">
                <span>feels_like</span>
                <span>{info.list[0].main.feels_like}</span>
              </div>
              <div className="showDetail">
                <span>pressure</span>
                <span>{info.list[0].main.pressure}</span>
              </div>
              <div className="showDetail">
                <span>humidity</span>
                <span>{info.list[0].main.humidity}</span>
              </div>
              <div className="showDetail">
                <span>wind speed</span>
                <span>{info.list[0].wind.speed}</span>
              </div>
            </div>
            <div className="showClouds">
              {info.list.map((item) => {
                return (
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
