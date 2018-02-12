import React, { Component } from 'react';
import '../App.css';
import moment from 'moment'


class WeatherMain extends Component {
    state = {
        dataWeather: null,
        dataQuote: null,
        dataGeoIp: null
    }


    componentWillMount() {
        this.getWeatherData()
        this.getQuoteData()
        this.getGeoIpData()
    }

    getWeatherData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Lublin,pl&units=metric&&lang=pl&APPID=0b3d75e5a49f2a267f054a0a60bed6f3`)
            .then(response => response.json())
            .then(dataWeather => this.setState({
                dataWeather: dataWeather
            }))
            .catch((err)=>console.log(err))
    }

    getQuoteData = () => {
        fetch(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`)
            .then(response => response.json())
            .then(dataQuote => this.setState({
                dataQuote: dataQuote
            }))
            .catch((err)=>console.log(err))
    }

    getGeoIpData = () => {
        fetch(`http://ip-api.com/json`)
            .then(response => response.json())
            .then(dataGeoIp => this.setState({
                dataGeoIp: dataGeoIp
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
                <div className="w-quote">
                    {
                        this.state.dataQuote
                        &&
                        this.state.dataQuote[0].content
                    }

                    --
                    {
                        this.state.dataQuote
                        &&
                        this.state.dataQuote[0].title
                    }
                </div>
                <div className="w-geoip">
                    GeoIp city:
                    {
                        this.state.dataGeoIp
                        &&
                        this.state.dataGeoIp.city
                    }
                </div>
                <div className="w-datetime">
                    {
                        moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
                    }
                </div>
            </div>
        );
    }
}

export default WeatherMain;
