import styles from "./WeatherHeroCardLoading.module.css"

const WeatherHeroCardLoading = () => {
    return (
        <div className={styles["main-container"]}>
            <div className={styles["dots-container"]}>
                <div className={styles.dot}></div>
                <div className={`${styles.dot} ${styles["center-dot"]}` }></div>
                <div className={styles.dot}></div>
            </div>
            <p className={styles["loading-paragraph"]}>Loading...</p>
        </div>
    )
}

export default WeatherHeroCardLoading;