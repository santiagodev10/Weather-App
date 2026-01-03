import styles from "./WeatherHeroCard.module.css"

const WeatherHeroCard = () => {
    return (
        <section className={styles["main-container"]}>
            <div className={styles["location-date-container"]}>
                <h2 className={styles["weather-location"]}>Berlin, Germany</h2>
                <h3 className={styles["weather-date"]}>Tuesday, Aug 5, 2025</h3>
            </div>
            <div className={styles["temperature-container"]}>
                <h4 className={styles["weather-temperature"]}>68°</h4>
                <figure className={styles["weather-image-container"]}>
                    <img className={styles["weather-image"]} src="/images/icon-sunny.webp" alt="weather image" />
                </figure>
            </div>
        </section>
    )
}

export default WeatherHeroCard;