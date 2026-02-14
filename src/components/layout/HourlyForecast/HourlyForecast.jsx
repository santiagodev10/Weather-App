import styles from "./HourlyForecast.module.css"
import DaysDropdown from "../../ui/DropdownButton/DaysDropdown";
import { getWeatherIcon } from "../../../utils/getIconsFromWeather";

const HourlyForecast = ({ hourly }) => {
    if (!hourly) return null;
    console.log(`Datos de hourly: ${hourly}`);
    
    // Mostramos las primeras 24 horas recibidas
    const hoursToShow = hourly.time.slice(15, 23);

    return (
        <aside>
            <h2 className={styles["hourly-forecast-title"]}>Hourly forecast</h2>
            {/* Opcional: pasar lógica real al dropdown en el futuro */}
            <DaysDropdown days={["Forecast"]}/> 
            
            <div className={styles["hourly-forecast-container"]}>
                {hoursToShow.map((time, index) => {
                    const date = new Date(time);
                    const hourStr = date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
                        console.log(`Datos de hourly is_day: ${hourly.is_day[index]}`);


                    return (
                        <div key={time} className={styles["hourly-forecast-item"]}>
                            <div className={styles["hourly-forecast-inner-container"]}>
                                <img className={styles["hourly-forecast-image"]} src={getWeatherIcon(hourly.weather_code[index], hourly.is_day)}
                                alt="weather icon" />
                                <p className={styles["hourly-forecast-hour"]}>{hourStr}</p>
                            </div>
                            <p className={styles["hourly-forecast-temp"]}>{Math.round(hourly.temperature_2m[index])}°</p>
                        </div>
                    );
                })}
            </div>
        </aside>
    )
}

export default HourlyForecast;
