import styles from "./DailyForecastLoading.module.css";

const DailyForecastLoading = () => {
    return (
        <>
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className={styles["loading-skeleton-item"]}></div>
            ))}
        </>
    );
};

export default DailyForecastLoading;
