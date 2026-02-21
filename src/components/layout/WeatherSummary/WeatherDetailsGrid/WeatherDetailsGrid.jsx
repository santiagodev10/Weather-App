import styles from "./WeatherDetailsGrid.module.css";
import WeatherDetailsGridLoading from "./WeatherDetailsGridLoading"

const WeatherDetailsGrid = ({ feelsLike, humidity, wind, precipitation, isLoading }) => {
    return (
        <section className={styles.container}>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Feels like</p>
                <p className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${Math.round(feelsLike)}°`}</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Humidity</p>
                <p className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${humidity}%`}</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Wind</p>
                <p className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${wind}km/h`}</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Precipitation</p>
                <p className={styles["data-value"]}>{isLoading ? <WeatherDetailsGridLoading /> : `${precipitation}mm`}</p>
            </div>
        </section>
    )
}

export default WeatherDetailsGrid;