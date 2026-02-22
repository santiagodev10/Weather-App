import { useState, useEffect } from "react";
import styles from "./HourlyForecast.module.css"
import DaysDropdown from "../../ui/DropdownButton/DaysDropdown";
import { getWeatherIcon } from "../../../utils/getIconsFromWeather";
import HourlyForecastLoading from "./HourlyForecastLoading";

const HourlyForecast = ({ hourly, daily, isLoading }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Seleccionamos el primer día disponible cuando llegan los datos
    useEffect(() => {
        if (daily && daily.time && daily.time.length > 0) {
            setSelectedDate(daily.time[0]);
        }
    }, [daily]);

    // if (isLoading) return <HourlyForecastLoading />;

    if (!daily && !isLoading) return null;
    
    // Si estamos cargando y aún no hay datos, usamos valores seguros para renderizar la estructura básica
    const safeDailyTime = daily ? daily.time : [];
    const safeHourlyTime = hourly ? hourly.time : [];

    // Filtramos los índices:
    // 1. Que correspondan al día seleccionado (startsWith selectedDate)
    // 2. Que la hora esté entre las 15:00 (3 PM) y las 22:00 (10 PM)
    const filteredIndices = safeHourlyTime
        .map((time, index) => {
            if (!selectedDate || !time.startsWith(selectedDate)) return -1;
            
            // time es "2023-10-25T15:00", extraemos la hora
            const hour = parseInt(time.split('T')[1].split(':')[0], 10);
            
            // Rango de 15 (3 PM) a 22 (10 PM) inclusive
            if (hour >= 15 && hour <= 22) {
                return index;
            }
            return -1;
        })
        .filter(index => index !== -1);

    return (
        <aside>
            <h2 className={styles["hourly-forecast-title"]}>Hourly forecast</h2>
            
            <DaysDropdown 
                days={safeDailyTime} 
                onSelectDay={(date) => setSelectedDate(date)}
                isLoading={isLoading}
            /> 
            
            {isLoading 
            ? (
                <HourlyForecastLoading />
            ) 
            : (
                <div className={styles["hourly-forecast-container"]}>
                {filteredIndices.map((originalIndex) => {
                    const time = hourly.time[originalIndex];
                    const temp = hourly.temperature_2m[originalIndex];
                    const code = hourly.weather_code[originalIndex];
                    const isDay = hourly.is_day[originalIndex];

                    const dateObj = new Date(time);
                    const hourStr = dateObj.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });

                    return (
                        <div key={time} className={styles["hourly-forecast-item"]}>
                            <div className={styles["hourly-forecast-inner-container"]}>
                                <img 
                                    className={styles["hourly-forecast-image"]} 
                                    src={getWeatherIcon(code, isDay)}
                                    alt="weather icon" 
                                />
                                <p className={styles["hourly-forecast-hour"]}>{hourStr}</p>
                            </div>
                            <p className={styles["hourly-forecast-temp"]}>{Math.round(temp)}°</p>
                        </div>
                    );
                })}
            </div>
            )}
        </aside>
    )
}

export default HourlyForecast;
