import styles from "./WeatherHeroCard.module.css"

const WeatherHeroCard = () => {
    return (
        <div className={styles["main-container"]}>
            <h2 className={styles["weather-location"]}>Berlin, Germany</h2>
            <h3 className={styles["weather-date"]}>Tuesday, Aug 5, 2025</h3>
            <div className={styles["temperature-container"]}>
                <h4 className={styles["weather-temperature"]}>68°</h4>
                <figure className={styles["weather-image-container"]}>
                    <img className={styles["weather-image"]} src="/images/icon-sunny.webp" alt="weather image" />
                </figure>
            </div>
        </div>
    )
}

export default WeatherHeroCard;