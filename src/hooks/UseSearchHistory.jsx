import { useState, useEffect } from 'react';
import { getSearchHistory, saveToSearchHistory, clearSearchHistory } from '../utils/localStorageService';

// Nombre del evento personalizado
const STORAGE_EVENT_KEY = 'weather_app_history_change';

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  // Cargar el historial al montar el componente y escuchar cambios
  useEffect(() => {
    // Función para actualizar estado desde localStorage
    const updateHistory = () => {
        setHistory(getSearchHistory());
    };

    // Carga inicial
    updateHistory();

    // Escuchar nuestro evento personalizado (para cambios en la misma pestaña)
    window.addEventListener(STORAGE_EVENT_KEY, updateHistory);
    
    // Escuchar cambios de otras pestañas (evento nativo del navegador)
    window.addEventListener('storage', updateHistory);

    return () => {
      window.removeEventListener(STORAGE_EVENT_KEY, updateHistory);
      window.removeEventListener('storage', updateHistory);
    };
  }, []);

  // Función para agregar una búsqueda
  const addToHistory = (searchItem) => {
    const updatedHistory = saveToSearchHistory(searchItem);
    // Disparamos el evento para avisar a otras instancias del hook
    window.dispatchEvent(new Event(STORAGE_EVENT_KEY));
    setHistory(updatedHistory);
  };

  // Función para limpiar el historial
  const clearHistory = () => {
    clearSearchHistory();
    window.dispatchEvent(new Event(STORAGE_EVENT_KEY));
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
};
