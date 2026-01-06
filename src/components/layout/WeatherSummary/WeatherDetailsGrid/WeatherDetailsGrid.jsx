import styles from "./WeatherDetailsGrid.module.css";

const WeatherDetailsGrid = () => {
    return (
        <section className={styles.container}>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Feels Like</p>
                <p className={styles["data-value"]}>64°</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Humidity</p>
                <p className={styles["data-value"]}>46%</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Wind</p>
                <p className={styles["data-value"]}>9 mph</p>
            </div>
            <div className={styles["data-container"]}>
                <p className={styles["data-item"]}>Precipitation</p>
                <p className={styles["data-value"]}>0 in</p>
            </div>
        </section>
    )
}

export default WeatherDetailsGrid;