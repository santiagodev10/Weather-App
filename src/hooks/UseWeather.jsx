import { useState, useEffect } from 'react';
import { parseInputToCoordenates, fetchWeatherData } from '../api/weatherService';

const useWeather = (city) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            // Si no hay ciudad, no hacemos nada (o reseteamos estado)
            if (!city) return;

            setLoading(true);
            setError(null);

            try {
                // 1. Obtener coordenadas
                const coords = await parseInputToCoordenates(city);

                if (!coords) {
                    throw new Error("No se pudo encontrar la ubicación.");
                }

                // 2. Usar esas coordenadas para obtener el clima
                const weather = await fetchWeatherData(coords.latitude, coords.longitude);

                // 3. Guardar todo junto. 
                // Es útil mezclar los datos del clima con los datos de la ciudad (nombre, país) 
                // para mostrarlos en el título de la UI.
                setWeatherData({
                    ...weather,
                    location: {
                        name: coords.name, 
                        country: coords.country
                    }
                });
                
            } catch (err) {
                setError(err.message || "Ocurrió un error inesperado");
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };

        getWeather();
    }, [city]);

    return { weatherData, loading, error };
};

export default useWeather;