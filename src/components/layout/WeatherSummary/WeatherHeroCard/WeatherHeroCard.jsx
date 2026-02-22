import styles from "./WeatherHeroCard.module.css"
import { getWeatherIcon } from "../../../../utils/getIconsFromWeather";
import WeatherHeroCardLoading from "./WeatherHeroCardLoading";

const WeatherHeroCard = ({ location, temperature, weatherCode, time, isDay, isLoading, units }) => {
    // Formatear la fecha. Ejemplo: "Tuesday, Aug 5, 2025"
    const date = new Date(); // Usamos fecha actual del cliente o parseamos 'time' si viene del API
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const tempSymbol = units?.temperature_unit === 'fahrenheit' ? '°F' : '°C';

    console.log(`Datos de current weatherCode: ${weatherCode}`);
    console.log(`Datos de current isDay: ${isDay}`);

    return (
        <section className={isLoading ? styles["main-container-loading"] : styles["main-container"]}>
            {isLoading 
            ? 
            <WeatherHeroCardLoading />
            : 
            <>
                <div className={styles["location-date-container"]}>
                    <h2 className={styles["weather-location"]}>{location.name}, {location.country}</h2>
                    <h3 className={styles["weather-date"]}>{formattedDate}</h3>
                </div>
                <div className={styles["temperature-container"]}>
                    {/* Math.round para quitar decimales si se prefiere */}
                    <h4 className={styles["weather-temperature"]}>{Math.round(temperature)}{tempSymbol}</h4>
                    <figure className={styles["weather-image-container"]}>
                        {/* TODO: Usar weatherCode para elegir la imagen correcta */}
                        <img className={styles["weather-image"]} src={getWeatherIcon(weatherCode, isDay)} alt="weather image" />
                    </figure>
                </div>
            </>
            }
        </section>
    )
}

export default WeatherHeroCard;