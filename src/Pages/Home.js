import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
const Home = () => {
  const context = useContext(UserContext);
  const [city, setCity] = useState({});
  const [input, setInput] = useState("");
  console.log(input);
  const baseURL = `http://api.weatherapi.com/v1/current.json?key=a14594a73e114417bfb185703210609&q=${input}`;

  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(baseURL);
      setCity(data);
      console.log(city.current?.feelslike_c);
    } catch {
      toast("No City Found", { type: "error" });
    }
  };

  if (!context.user?.uid) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container" style={{ marginTop: "150px" }}>
        <section className="search-location">
          <div className="search-input-group row">
            <div className="col-md-10">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search City"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-info" onClick={fetchDetails}>
                Search
              </button>
            </div>
          </div>
          {input ? (
            <div className="row">
              <div className="col-md-9 offset-md-1">
                <div className="weather-box tex-white mt-5 d-flex p-4 align-items-center shadow-sm p-3 mb-5 bg-dark rounded">
                  <div
                    className="row-1 d-flex flex-column mr-5"
                    style={{ width: "50%" }}
                  >
                    <div className="text-1">
                      <p className="text-white">CURRENT WEATHER</p>
                      <p className="text-bold text-secondary">
                        {city.location?.localtime}
                      </p>
                    </div>
                    <div className="row-2 d-flex align-items-start">
                      <div className="mr-3">
                        <img
                          src={city.current?.condition.icon}
                          style={{ width: "90px", height: "90px" }}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div>
                        <p style={{ fontSize: "60px", color: "#fff" }}>
                          {city.current?.temp_c}°C
                        </p>
                        <p style={{ fontSize: "20px", color: "#fff" }}>
                          RealFeel® {city.current?.feelslike_c}°C
                        </p>
                      </div>
                    </div>
                    <div className="row-3">
                      <p style={{ fontSize: "15px", color: "#fff" }}>
                        {city.current?.condition.text}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex flex-column" style={{ width: "50%" }}>
                    <div
                      className="air-quality d-flex justify-content-between mb-4"
                      style={{ borderBottom: "2px solid #f2f2f2" }}
                    >
                      <div>
                        <p className="text-white">Humidity</p>
                      </div>
                      <div>
                        <p className="text-warning font-weight-bold">
                          {city.current?.humidity}%
                        </p>
                      </div>
                    </div>
                    <div
                      className="wind d-flex justify-content-between mb-4"
                      style={{ borderBottom: "2px solid #f2f2f2" }}
                    >
                      <div>
                        <p className="text-white">Wind</p>
                      </div>
                      <div>
                        <p className="text-info font-weight-bold">
                          {city.current?.wind_dir} {city.current?.wind_kph} KM /
                          h
                        </p>
                      </div>
                    </div>
                    <div
                      className="air-quality d-flex justify-content-between mb-4"
                      style={{ borderBottom: "2px solid #f2f2f2" }}
                    >
                      <div>
                        <p className="text-white">Wind Gusts</p>
                      </div>
                      <div>
                        <p class="text-primary font-weight-bold">
                          {city.current?.gust_kph} km/h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
};

export default Home;
