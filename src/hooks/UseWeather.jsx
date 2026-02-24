import { useState, useEffect } from 'react';
import { parseInputToCoordenates, fetchWeatherData } from '../api/weatherService';

const useWeather = (city, units) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    // Separamos los errores en dos estados
    const [errorResults, setErrorResults] = useState(null); // Para "Ciudad no encontrada"
    const [errorServer, setErrorServer] = useState(null);   // Para "Error 500 / Fallo de API"

    useEffect(() => {
        const getWeather = async () => {
            // Si no hay ciudad, no hacemos nada (o reseteamos estado)
            if (!city) return;

            setLoading(true);
            setErrorResults(null); 
            setErrorServer(null);

            try {
                // 1. Obtener coordenadas (ahora devuelve un array)
                const candidates = await parseInputToCoordenates(city);

                // Verificamos si hay al menos un candidato
                if (!candidates || candidates.length === 0) {
                    setErrorResults("No se pudo encontrar la ubicación.");
                    setWeatherData(null);
                    return; // Importante detener la ejecución aquí
                }

                // Tomamos el primer resultado como la opción por defecto
                const coords = candidates[0];

                // 2. Usar esas coordenadas Y LAS UNIDADES para obtener el clima
                const weather = await fetchWeatherData(coords.latitude, coords.longitude, units);

                // 3. Guardar todo junto. 
                // Es útil mezclar los datos del clima con los datos de la ciudad (nombre, país) 
                // para mostrarlos en el título de la UI.
                //setWeatherData modifica el estado de weatherData, el cual se esta enviando a los componentes
                setWeatherData({
                    ...weather,
                    location: {
                        name: coords.name, 
                        country: coords.country,
                        id: coords.id,
                        admin1: coords.admin1,
                        lat: coords.latitude,
                        lon: coords.longitude
                    },
                    // Guardamos la configuración de unidades actual en la respuesta para referencia si es necesario
                    unitsConfig: weather.current_units 
                });
                
            } catch (err) {
                console.error("Error en useWeather:", err);
                const message = err.message || "Ocurrió un error inesperado";
                
                // Si el mensaje sugiere un error de servidor (como el que forzamos) o fetch fallido
                // Asumiremos que cualquier error no controlado aquí es de servidor/conexión
                setErrorServer(message);
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };

        getWeather();
    }, [city, units]);

    return { weatherData, loading, errorResults, errorServer };
};

export default useWeather;