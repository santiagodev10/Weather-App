import { useState, useEffect } from 'react';
import styles from "./Layout.module.css"
import Header from './Header/Header';
import Search  from './Search/Search';
import WeatherSummary from './WeatherSummary/WeatherSummary';
import DailyForecast from './DailyForecast/DailyForecast';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import useWeather from '../../hooks/UseWeather';
import { useSearchHistory } from '../../hooks/UseSearchHistory';
import { getSearchHistory } from '../../utils/localStorageService';


const Layout = () => {
    const [searchCity, setSearchCity] = useState(() => {
        const history = getSearchHistory();
        return history.length > 0 ? history[0].name : "";
    });
    const [units, setUnits] = useState({
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm"
    });

    const { weatherData, loading, errorResults, errorServer } = useWeather(searchCity, units);
    const { addToHistory } = useSearchHistory();
    
    // Efecto para guardar en el historial solo cuando la carga es exitosa y hay datos
    useEffect(() => {
        if (!loading && !errorResults && !errorServer && weatherData?.location) {
            const location = weatherData.location;
            // Guardamos con un formato consistente
            // Usamos 'id' basado en el ID de la API si existe, o generamos uno único combinando coords
            const historyItem = {
                id: location.id || `${location.lat}-${location.lon}`,
                name: location.name,
                country: location.country,
                admin1: location.admin1,
                isManual: false // Ahora todas las que vienen de la API son "validadas"
            };
            addToHistory(historyItem);
        }
    }, [weatherData, loading, errorResults, errorServer]); // Se ejecuta cuando cambia el estado de la carga


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
                {errorResults && (
                    <p className={styles["error-message"]}>{errorResults}</p>
                )}

                {errorServer && (
                    <div className={styles["server-error-container"]}>
                        <img className={styles["server-icon-error"]} src="/images/icon-error.svg" alt="error-icon" />
                        <h2 className={styles["server-error-title"]}>Something went wrong</h2>
                        <p className={styles["server-error-message"]}>We couldn't connect to the server (API error). Please try again in a few moments.</p>
                        <button className={styles["server-error-retry"]} onClick={() => window.location.reload()}>
                            <img src="/images/icon-retry.svg" alt="retry-icon" />
                            Retry
                        </button>
                    </div>
                )}
                
                {!searchCity && !errorServer && !errorResults ? (
                    <div className={styles["welcome-message-container"]}>
                        <h2 className={styles["welcome-message"]}>Welcome to Weather Now! 🌤️</h2>
                        <p className={styles["welcome-paragraph"]}>Search for a city to see the forecast</p>
                    </div>
                ) : (
                    <>
                        {/* Solo mostramos el contenido si hay datos o está cargando, PERO NO si hay error de servidor */}
                        {!errorServer && !errorResults && (weatherData || loading) && (
                            <>
                                <Search onSearch={handleSearch} isLoading={loading} />

                                <div className={styles["weather-info-wrapper"]}>
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
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default Layout;