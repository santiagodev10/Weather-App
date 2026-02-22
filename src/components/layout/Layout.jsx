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
    const [units, setUnits] = useState({
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm"
    });

    const { weatherData, loading, error } = useWeather(searchCity, units);
    

    const handleSearch = (city) => {
        setSearchCity(city);
    };

    // Handlers para actualizar unidades
    const handleTempChange = (option) => {
        // Mapeo del texto del dropdown a valores de la API
        const value = option.includes("Fahrenheit") ? "fahrenheit" : "celsius";
        setUnits(prev => ({ ...prev, temperature_unit: value }));
    };

    const handleWindChange = (option) => {
        const value = option === "mph" ? "mph" : "kmh";
        setUnits(prev => ({ ...prev, wind_speed_unit: value }));
    };

    const handlePrepChange = (option) => {
        const value = option.includes("Inches") ? "inch" : "mm";
        setUnits(prev => ({ ...prev, precipitation_unit: value }));
    };

    return (
        <>
            <Header 
                isLoading={loading} 
                onUnitChange={{
                    temp: handleTempChange,
                    wind: handleWindChange,
                    prep: handlePrepChange
                }}
            />
            <main>
                <Search onSearch={handleSearch} isLoading={loading} />
                <div className={styles["weather-info-wrapper"]}>
                    {error && <p>Error: {error}</p>}

                    {(weatherData || loading) && (
                        <>
                            <WeatherSummary 
                                current={weatherData?.current} 
                                location={weatherData?.location} 
                                isLoading={loading} 
                                units={units}
                            />
                            <>
                                <DailyForecast daily={weatherData?.daily} isLoading={loading} units={units} />
                                <HourlyForecast hourly={weatherData?.hourly} daily={weatherData?.daily} isLoading={loading} units={units} />
                            </>
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default Layout;