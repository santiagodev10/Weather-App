import { useState, useEffect } from 'react';
import { parseInputToCoordenates } from '../api/weatherService';

const useAutocomplete = (userInput) => {
    // Definimos los tres estados principales que acordamos
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            // 1. Si el input está vacío o es muy corto, los tres estados vuelven a su estado original y salimos
            if (!userInput || userInput.trim() === "") {
                setSuggestions([]);
                setError(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const results = await parseInputToCoordenates(userInput);
                setSuggestions(results || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching suggestions:", err);
                setError("Error obtaining location data.");
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms de debounce

        // Función de limpieza: Si el usuario escribe antes de los 300ms,
        // cancelamos el timeout anterior.
        return () => clearTimeout(timer);
    }, [userInput]);

    return { suggestions, loading, error };
};

export default useAutocomplete;