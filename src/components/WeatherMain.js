import React, {Component} from 'react';
import '../App.css';
import moment from 'moment'
import entities from 'html-entities'


class WeatherMain extends Component {
    state = {
        dataWeather: null,
        dataQuote: null,
        dataGeoIp: null,

        panelOpened:false,
        customCity:'',
        isCustomCitySet: false,
        isCityOK: false
    }


    componentDidMount() {
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
        let weatherUrl = ''
        if (this.state.isCityOK && this.state.isCustomCitySet){ //if custom city set
            const city = this.state.customCity;
            weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&lang=en&APPID=dabd8394d3f47226e331477d5ccf265e`;
        }else{ //if no custom city set, get coordinates NOT city name from ip-api
            const lat = this.state.dataGeoIp.lat ? this.state.dataGeoIp.lat : "51.2441"; //lat&long because ip-api returns non-valid city names
            const lon = this.state.dataGeoIp.lon ? this.state.dataGeoIp.lon : "22.513";
            weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&lang=en&APPID=dabd8394d3f47226e331477d5ccf265e`
        }

        fetch(weatherUrl)
            .then(response => response.json())
            .then(dataWeather => {
                if(dataWeather.cod === 200) {
                    this.setState({
                        dataWeather: dataWeather,
                        isCityOK: true
                    })
                    console.log(dataWeather)
                }else{
                    this.setState({
                        isCityOK: false
                    })
                }
            })
            .catch((err) => console.log('weather fetch err: ', err))
    }

    getQuoteData = () => {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let targetUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
        fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            .then(dataQuote => this.setState({
                dataQuote: dataQuote
            }))
            .catch((err) => console.log(err))
    }

    onChangeInputCityHandler = (e) => {
        this.setState({ customCity: e.target.value })
    }

    onClickAddCityHandler = () => {
        this.setState({ isCustomCitySet: true })
        this.getWeatherData()
        console.log('add clicked')
    }

    onClickRemoveCityHandler = () => {
        this.setState({ isCustomCitySet: false, customCity: '', panelOpened: true })
        this.getWeatherData()
        console.log('remove clicked')
    }

    togglePanelHandler = () => {
        this.setState({ panelOpened: !this.state.panelOpened })
    }


    render() {
        //let testQuote = 'I loathe the phrase &#8220;no questions asked.&#8221; Great service is about communication, sincerity, and action &#8211; not blind automation.'
        //console.log(this.state.dataWeather)

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
                        // this.state.dataGeoIp
                        // &&
                        // this.state.dataGeoIp.city

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
                            entities.AllHtmlEntities.decode(this.state.dataQuote[0].content.replace('<p>','').replace('</p>',''))
                        }
                        {/*{entities.AllHtmlEntities.decode(testQuote)}*/}
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
                <div className="w-panel">
                    <div className="w-panel-button">
                        <button onClick={this.togglePanelHandler}>Custom City</button>
                    </div>
                    {
                        this.state.panelOpened ?
                            <div className="w-panel-input">
                                <input
                                    type="text"
                                    placeholder="enter city name ..."
                                    onChange={this.onChangeInputCityHandler}
                                    value={this.state.customCity}
                                />
                                <button onClick={this.onClickAddCityHandler}>+</button>
                                <button onClick={this.onClickRemoveCityHandler}>-</button>
                                <br />{this.state.customCity}
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default WeatherMain;
