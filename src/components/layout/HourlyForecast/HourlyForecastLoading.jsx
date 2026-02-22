import styles from "./HourlyForecastLoading.module.css";

const HourlyForecastLoading = () => {
    return (
            <div className={styles["hourly-forecast-container"]}>
                {/* Generamos 8 elementos simulados para el esqueleto de carga */}
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className={styles["loading-skeleton-item"]}></div>
                ))}
            </div>
    );
};

export default HourlyForecastLoading;
