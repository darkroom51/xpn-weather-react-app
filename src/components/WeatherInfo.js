import React from 'react';
import '../App.css';
import moment from 'moment'

const WeatherInfo = (props) => (
    <div>
        <div className="w-icon">
            <img
                src={`${process.env.PUBLIC_URL}/img/${props.dataWeather && props.dataWeather.weather[0].icon}.svg`}
                alt={""}
            />
        </div>
        <div className="w-city">
            {
                props.dataWeather
                &&
                props.dataWeather.name
            }
            {/*{*/}
                {/*props.isCustomCitySet ?*/}
                    {/*<span role="img" alt="" aria-label="world">&#127757;</span>*/}
                    {/*:*/}
                    {/*<span role="img" alt="" aria-label="home">&#128156;</span>*/}
            {/*}*/}
        </div>
        <div className="w-description">
            {
                props.dataWeather
                &&
                props.dataWeather.weather[0].description
            }
        </div>
        <div className="w-temperature">
            <div className="w-temperature-num">
                {
                    props.dataWeather
                    &&
                    Math.round(props.dataWeather.main.temp)
                }
            </div>
            <div className="w-temperature-sign">
                &deg;C
            </div>
        </div>
        <div className="w-datetime">
            {
                moment().format("dddd, MMMM Do YYYY")
            }
        </div>
    </div>
)

export default WeatherInfo;