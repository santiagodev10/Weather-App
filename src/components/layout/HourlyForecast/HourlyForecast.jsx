import styles from "./HourlyForecast.module.css"

const HourlyForecast = () => {
    return (
        <aside>
            <h2 className={styles["hourly-forecast-title"]}>Hourly forecast</h2>
            <div className={styles["hourly-forecast-container"]}>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
                <div className={styles["hourly-forecast-item"]}>
                    <div className={styles["hourly-forecast-inner-container"]}>
                        <img className={styles["hourly-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                        <p className={styles["hourly-forecast-hour"]}>3 PM</p>
                    </div>
                    <p className={styles["hourly-forecast-temp"]}>68</p>
                </div>
            </div>
        </aside>
    )
}

export default HourlyForecast;