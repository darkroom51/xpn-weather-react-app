import React, { Component } from 'react';
import '../App.css';


class WeatherMain extends Component {
    state = {
        dataWeather: null
    }


    componentWillMount() {
        this.getWeatherData()
    }

    getWeatherData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Lublin,pl&units=metric&&lang=pl&APPID=0b3d75e5a49f2a267f054a0a60bed6f3`)
            .then(response => response.json())
            .then(dataWeather => this.setState({
                dataWeather: dataWeather
            }))
            .catch((err)=>console.log(err))
    }


    render() {

        return (
            <div>
                <div className="w-icon">
                    <img
                        src={`http://openweathermap.org/img/w/${this.state.dataWeather && this.state.dataWeather.weather[0].icon}.png`}
                        alt={""}
                    />

                    {
                        this.state.dataWeather
                        &&
                        this.state.dataWeather.weather[0].description
                    }
                </div>
                <div className="w-city">
                    {
                        this.state.dataWeather
                        &&
                        this.state.dataWeather.name
                    }
                </div>
                <div className="w-temperature">
                    {
                        this.state.dataWeather
                        &&
                        this.state.dataWeather.main.temp
                    }
                    &nbsp;&deg;C
                </div>
            </div>
        );
    }
}

export default WeatherMain;
