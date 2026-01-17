import styles from "./WeatherDetailsGrid.module.css";

const WeatherDetailsGrid = ({ feelsLike, humidity, wind, precipitation }) => {
    return (
        <section className={styles.container}>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Feels like</p>
                <p className={styles["data-value"]}>{Math.round(feelsLike)}°</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Humidity</p>
                <p className={styles["data-value"]}>{humidity}%</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Wind</p>
                <p className={styles["data-value"]}>{wind} km/h</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Precipitation</p>
                <p className={styles["data-value"]}>{precipitation} mm</p>
            </div>
        </section>
    )
}

export default WeatherDetailsGrid;