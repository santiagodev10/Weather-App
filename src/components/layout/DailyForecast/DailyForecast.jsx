import styles from "./DailyForecast.module.css"
import { getWeatherIcon } from "../../../utils/getIconsFromWeather";
import DailyForecastLoading from "./DailyForecastLoading";

const DailyForecast = ({ daily, isLoading, units }) => {
    if (!daily && !isLoading) return null;

    const tempSymbol = units?.temperature_unit === 'fahrenheit' ? '°F' : '°C';

    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { weekday: "short" });
    };

    return (
        <section className={styles["daily-forecast-section"]}>
            <h2 className={styles["daily-forecast-title"]}>Daily forecast</h2>
            <div className={styles["daily-forecast-wrapper"]}>
                {isLoading 
                ? 
                <DailyForecastLoading />
                : 
                daily.time.map((time, index) => (
                    
                    <div key={time} className={styles["daily-forecast-item"]}>
                        <p className={styles["daily-forecast-day"]}>{getDayName(time)}</p>
                        <img className={styles["daily-forecast-image"]} src={getWeatherIcon(daily.weather_code[index], 1)} alt="weather icon" />
                        <div className={styles["daily-forecast-temp-wrapper"]}>
                            <p className={styles["daily-forecast-max-temp"]}>{Math.round(daily.temperature_2m_max[index])}{tempSymbol}</p>
                            <p className={styles["daily-forecast-min-temp"]}>{Math.round(daily.temperature_2m_min[index])}{tempSymbol}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default DailyForecast;
