import WeatherHeroCard from "./WeatherHeroCard/WeatherHeroCard";
import WeatherDetailsGrid from "./WeatherDetailsGrid/WeatherDetailsGrid";

const WeatherSummary = ({ current, location }) => {  
    return (
        <>
            <WeatherHeroCard 
                location={location} 
                temperature={current.temperature_2m}
                weatherCode={current.weather_code}
                time={current.time}
                isDay={current.is_day}
            />
            <WeatherDetailsGrid 
                feelsLike={current.apparent_temperature}
                humidity={current.relative_humidity_2m}
                wind={current.wind_speed_10m}
                precipitation={current.precipitation}
            />
        </>
    )
}

export default WeatherSummary;