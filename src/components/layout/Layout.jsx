import { useState } from 'react';
import styles from "./Layout.module.css"
import Header from './Header/Header';
import Search  from './Search/Search';
import WeatherSummary from './WeatherSummary/WeatherSummary';
import DailyForecast from './DailyForecast/DailyForecast';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import useWeather from '../../hooks/UseWeather';


const Layout = () => {
    const [searchCity, setSearchCity] = useState("Madrid");
    const { weatherData, loading, error } = useWeather(searchCity);
    

    const handleSearch = (city) => {
        setSearchCity(city);
    };

    return (
        <>
            <Header />
            <main>
                <Search onSearch={handleSearch} isLoading={loading} />
                <div className={styles["weather-info-wrapper"]}>
                    {/* {loading && <p>ESPERANDO...</p>} */}
                    {error && <p>Error: {error}</p>}

                    {weatherData && (
                        <>
                            <WeatherSummary current={weatherData.current} location={weatherData.location} isLoading={loading} />
                            <DailyForecast daily={weatherData.daily} />
                            <HourlyForecast hourly={weatherData.hourly} daily={weatherData.daily} />
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default Layout;