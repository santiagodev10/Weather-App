import styles from "./WeatherDetailsGrid.module.css";
import WeatherDetailsGridLoading from "./WeatherDetailsGridLoading"

const WeatherDetailsGrid = ({ feelsLike, humidity, wind, precipitation, isLoading }) => {
    return (
        <section className={styles.container}>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Feels like</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${Math.round(feelsLike)}°`}</div>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Humidity</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${humidity}%`}</div>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Wind</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${wind}km/h`}</div>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Precipitation</p>
                <div className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${precipitation}mm`}</div>
            </div>
        </section>
    )
}

export default WeatherDetailsGrid;