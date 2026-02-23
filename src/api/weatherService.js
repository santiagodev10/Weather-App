//Estas son las funciones puras que obtienen los datos del clima desde la API externa

const API_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";
const API_URL = "https://api.open-meteo.com/v1/forecast";

//Necesitamos dos funciones, una para convertir el string del input del usuario en coordenadas de ubicación (latitud y longitud), y otra para recibir esas coordenadas y realizar la petición a la API de los demás datos.

export const parseInputToCoordenates = async (inputStr) => {
    if(!inputStr) console.log("No existe");

    try {
        const response = await fetch(`${API_GEOCODING}?name=${inputStr}&count=8&format=json`);
        const data = await response.json();
        
        // Retornamos la lista completa de resultados o un array vacío si no hay coincidencias
        if (!data.results) return [];
        
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const fetchWeatherData = async (latitude, longitude, units = {}) => {
    try {
        //Valores por defecto para las unidades, en caso de que no se pasen en el objeto units. Si le envías una configuración, por ejemplo { temperature_unit: "fahrenheit" }, la función usará "fahrenheit" para la temperatura, pero mantendrá el viento y la precipitación con sus valores por defecto si no los especificas.
        const {
            temperature_unit = "celsius",
            wind_speed_unit = "kmh",
            precipitation_unit = "mm"
        } = units;

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
            timezone: "auto", // Importante para que las horas coincidan con la ubicación
            temperature_unit,
            wind_speed_unit,
            precipitation_unit
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