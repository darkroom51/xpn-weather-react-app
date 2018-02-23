import React, {Component} from 'react';
import '../App.css';
import WeatherInfo from './WeatherInfo';
import QuoteInfo from './QuoteInfo'


class WeatherMain extends Component {
    state = {
        dataWeather: null,
        dataQuote: null,
        dataGeoIp: null,

        panelOpened:false,
        customCity:"",
        isCustomCitySet: false,
        isCityOK: false,
        infoMsg:""
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
                this.getWeatherDataDefault()
            })
            .catch((err) => console.log(err))
    }

    getWeatherData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(dataWeather => {
                if(dataWeather.cod === 200) {
                    this.setState({
                        dataWeather: dataWeather,
                        isCityOK: true,
                        infoMsg:""
                    })
                }else{
                    this.setState({
                        isCityOK: false,
                        infoMsg: "Sorry, we don't support this city :)"
                    })
                }
            })
            .catch((err) => console.log('weather fetch err: ', err))
    }

    getWeatherDataDefault = () => {
        let weatherUrl;
        const lat = this.state.dataGeoIp.lat ? this.state.dataGeoIp.lat : "51.2441"; //lat&long because ip-api returns non-valid city names
        const lon = this.state.dataGeoIp.lon ? this.state.dataGeoIp.lon : "22.513";
        weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&lang=en&APPID=dabd8394d3f47226e331477d5ccf265e`
        this.getWeatherData(weatherUrl)
    }

    getWeatherDataCustom = () => {
        let weatherUrl;
        const city = this.state.customCity;
        weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&lang=en&APPID=dabd8394d3f47226e331477d5ccf265e`;
        this.getWeatherData(weatherUrl)
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
        if (this.state.customCity) {
            this.setState({isCustomCitySet: true})
            this.getWeatherDataCustom()
        }
    }

    onClickRemoveCityHandler = () => {
        this.setState({ isCustomCitySet: false, customCity: "", panelOpened: false })
        this.getWeatherDataDefault()
    }

    togglePanelHandler = () => {
        this.setState({ panelOpened: !this.state.panelOpened })
    }

    overlayHandler = () => {
        this.setState({ panelOpened: false })
    }


    render() {
        return (
            <div className={
                this.state.dataWeather
                &&
                this.state.dataWeather.main.temp < 0 ?
                    "w-main cold"
                    :
                    "w-main warm"}>
                {
                    this.state.panelOpened ?
                        <div className="w-overlay" onClick={this.overlayHandler}>&nbsp;</div>
                        :
                        null
                }
                <WeatherInfo dataWeather={this.state.dataWeather} isCustomCitySet={this.state.isCustomCitySet}/>
                <QuoteInfo dataQuote={this.state.dataQuote}/>
                <div className="w-panel">
                    <div className="w-panel-button">
                        <button
                            onClick={this.togglePanelHandler}
                            style={this.state.isCustomCitySet ? {color:'#33C3F0'} : null}
                        >
                            <i className="fa fa-globe" role="img" alt="" aria-label="Custom City"> </i>
                        </button>
                    </div>
                    {
                        this.state.panelOpened ?
                            <div className="w-panel-container">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="enter city name ..."
                                        onChange={this.onChangeInputCityHandler}
                                        value={this.state.customCity}
                                    />
                                    <button onClick={this.onClickAddCityHandler} id={"add"}><i className="fa fa-check"> </i></button>
                                    <button onClick={this.onClickRemoveCityHandler} id={"del"}><i className="fa fa-close"> </i></button>
                                </div>
                                <div className="info-msg">
                                    {this.state.infoMsg}
                                </div>
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
