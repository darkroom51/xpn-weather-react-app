import React, {Component} from 'react';
import '../App.css';
import moment from 'moment'


class WeatherMain extends Component {
    state = {
        dataWeather: null,
        dataQuote: null,
        dataGeoIp: null
    }


    componentWillMount() {
        this.getGeoIpData()

        this.getQuoteData()
    }

    getGeoIpData = () => {
        fetch(`http://ip-api.com/json`)
            .then(response => response.json())
            .then(dataGeoIp => {
                this.setState({
                    dataGeoIp: dataGeoIp
                })
                this.getWeatherData()
            })
            .catch((err) => console.log(err))
    }

    getWeatherData = () => {
        const city = this.state.dataGeoIp ? this.state.dataGeoIp.city : "Koszalin";
        const countryCode = this.state.dataGeoIp ? this.state.dataGeoIp.countryCode : "pl";
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&&lang=en&APPID=0b3d75e5a49f2a267f054a0a60bed6f3`)
            .then(response => response.json())
            .then(dataWeather => this.setState({
                dataWeather: dataWeather
            }))
            .catch((err) => console.log(err))
    }

    getQuoteData = () => {
        fetch(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`)
            .then(response => response.json())
            .then(dataQuote => this.setState({
                dataQuote: dataQuote
            }))
            .catch((err) => console.log(err))
    }


    render() {
        console.log(this.state.dataWeather)

        return (
            <div className={
                this.state.dataWeather
                &&
                this.state.dataWeather.main.temp < -2 ?
                    "w-main cold"
                    :
                    "w-main warm"
            }>
                <div className="w-icon">
                    <img
                        src={`${process.env.PUBLIC_URL}/img/${this.state.dataWeather && this.state.dataWeather.weather[0].icon}.svg`}
                        alt={""}
                    />
                </div>
                <div className="w-city">
                    {
                        this.state.dataWeather
                        &&
                        this.state.dataWeather.name
                    }
                </div>
                <div className="w-description">
                    {
                        this.state.dataWeather
                        &&
                        this.state.dataWeather.weather[0].description
                    }
                </div>
                <div className="w-temperature">
                    <div className="w-temperature-num">
                        {
                            this.state.dataWeather
                            &&
                            Math.round(this.state.dataWeather.main.temp)
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
                <div className="w-quote">
                    <div className="w-quote-content">
                        {
                            this.state.dataQuote
                            &&
                            this.state.dataQuote[0].content.replace('<p>','').replace('</p>','')
                        }
                    </div>
                    <div className="w-quote-title">
                        --&nbsp;
                        {
                            this.state.dataQuote
                            &&
                            this.state.dataQuote[0].title
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherMain;
