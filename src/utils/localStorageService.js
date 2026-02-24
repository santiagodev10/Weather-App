const STORAGE_KEY = 'weather_search_history';
const MAX_HISTORY_ITEMS = 5;

/**
 * Obtiene el historial de búsquedas desde localStorage
 * @returns {Array} Array de búsquedas o array vacío si hay error
 */
export const getSearchHistory = () => {
    try {
        const history = localStorage.getItem(STORAGE_KEY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error reading search history from localStorage:', error);
        return [];
    }
};

/**
 * Guarda un nuevo item en el historial
 * @param {Object|string} searchItem - El item a guardar
 * @returns {Array} El nuevo historial actualizado
 */
export const saveToSearchHistory = (searchItem) => {
    try {
        const currentHistory = getSearchHistory();
        
        // Filtramos el item si ya existe para moverlo al principio (efecto "reciente")
        // Usamos 'id' si existe, o comparamos el objeto entero/string
        const filteredHistory = currentHistory.filter(item => {
        if (item.id && searchItem.id) {
            return item.id !== searchItem.id;
        }
        // Fallback para strings o objetos simples sin id
        return JSON.stringify(item) !== JSON.stringify(searchItem);
        });

    // Agregamos al inicio y limitamos a 5
    const newHistory = [searchItem, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
    } catch (error) {
        console.error('Error saving search history to localStorage:', error);
        return [];
    }
};

/**
 * Limpia todo el historial de búsquedas
 */
export const clearSearchHistory = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing search history:', error);
    }
};
