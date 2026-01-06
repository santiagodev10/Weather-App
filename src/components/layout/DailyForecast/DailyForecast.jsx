import styles from "./DailyForecast.module.css"

const DailyForecast = () => {
    return (
        <section>
            <h2 className={styles["daily-forecast-title"]}>Daily forecast</h2>
            <div className={styles["daily-forecast-wrapper"]}>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
                <div className={styles["daily-forecast-item"]}>
                    <p className={styles["daily-forecast-day"]}>Tue</p>
                    <img className={styles["daily-forecast-image"]} src="../../../public/images/icon-snow.webp" alt="weather icon" />
                    <div className={styles["daily-forecast-temp-wrapper"]}>
                        <p className={styles["daily-forecast-max-temp"]}>68</p>
                        <p className={styles["daily-forecast-min-temp"]}>57</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DailyForecast;