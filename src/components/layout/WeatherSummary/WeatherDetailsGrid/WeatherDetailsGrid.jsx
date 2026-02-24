import styles from "./WeatherDetailsGrid.module.css";
import WeatherDetailsGridLoading from "./WeatherDetailsGridLoading"

const WeatherDetailsGrid = ({ feelsLike, humidity, wind, precipitation, isLoading, units }) => {
    
    const tempSymbol = units?.temperature_unit === 'fahrenheit' ? '°F' : '°C';
    const windUnit = units?.wind_speed_unit === 'mph' ? 'mph' : 'km/h';
    const prepUnit = units?.precipitation_unit === 'inch' ? 'in' : 'mm';

    return (
        <section className={styles.container}>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Feels like</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${Math.round(feelsLike)}${tempSymbol}`}</div>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Humidity</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${humidity}%`}</div>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Wind</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${wind} ${windUnit}`}</div>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Precipitation</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${precipitation} ${prepUnit}`}</div>
            </div>
        </section>
    )
}

export default WeatherDetailsGrid;