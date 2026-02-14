//Estas son las funciones puras que obtienen los datos del clima desde la API externa

const API_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";
const API_URL = "https://api.open-meteo.com/v1/forecast";

//Necesitamos dos funciones, una para convertir el string del input del usuario en coordenadas de ubicación (latitud y longitud), y otra para recibir esas coordenadas y realizar la petición a la API de los demás datos.

export const parseInputToCoordenates = async (inputStr) => {
    if(!inputStr) console.log("No existe");

    try {
        const response = await fetch(`${API_GEOCODING}?name=${inputStr}&count=10&format=json`);
        const data = await response.json();
        console.log(data.results[0]);
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        const name = data.results[0].name;
        const country = data.results[0].country;

        return {
            latitude,
            longitude,
            name,
            country
        };
    } catch (error) {
        console.log(error);
    }
}

export const fetchWeatherData = async (latitude, longitude) => {
    try {
        // Configuramos los parámetros para: Temp actual, sensación, humedad, viento, precipitación, pronóstico diario y por hora
        const params = new URLSearchParams({
            latitude: latitude,
            longitude: longitude,
            // Datos actuales
            current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "weather_code", "wind_speed_10m", "is_day"],
            // Pronóstico por hora (opcionalmente puedes limitar las horas con &forecast_days=1 si quieres menos info)
            hourly: ["temperature_2m", "weather_code", "precipitation_probability", "is_day"],
            // Pronóstico diario
            daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
            timezone: "auto" // Importante para que las horas coincidan con la ubicación
        });        

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const data = await response.json();
        console.log(data);
        return data; // No olvides retornar los datos
    } catch (error) {
        console.log(error);
        throw error; // Re-lanzar el error para que quien llame a la función sepa que falló
    }
}