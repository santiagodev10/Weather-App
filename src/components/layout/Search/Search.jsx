import { useState, useEffect, useRef } from 'react';
import styles from "./Search.module.css"
import SearchInProgress from './SearchInProgress';
import useAutocomplete from '../../../hooks/UseAutocomplete';
import { useSearchHistory } from '../../../hooks/UseSearchHistory';

const Search = ({ onSearch, isLoading }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false); // Controlar visibilidad
    const [isFocused, setIsFocused] = useState(false); // Nuevo estado para controlar el foco
    const { history, addToHistory } = useSearchHistory(); 
    const { suggestions, loading: suggestionsLoading, error: suggestionsError } = useAutocomplete(inputValue);
    const suggestionsListRef = useRef(null);

    // Scroll automático al elemento seleccionado
    useEffect(() => {
        if (selectedIndex >= 0 && suggestionsListRef.current) {
            const listItems = suggestionsListRef.current.children;
            // Asegurarse de que el índice es válido y no contamos el loader/error
            // (El loader/error son li, así que debemos tener cuidado si aparecen)
            // En mi lógica actual, si hay loading/error, no hay navegación por flechas, así que es seguro.
            
            if (listItems[selectedIndex]) {
                listItems[selectedIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest', // Scroll mínimo necesario para mostrarlo
                });
            }
        }
    }, [selectedIndex]);
    
    // Resetear el índice y mostrar sugerencias cuando el input cambia
    useEffect(() => {
        setSelectedIndex(-1);
        setShowSuggestions(true);
    }, [inputValue, suggestions]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Si el usuario presiona Enter, usamos el valor del input directamente
        if (inputValue.trim()) {
            onSearch(inputValue);
            // NOTA: Ya no guardamos aquí directamente para evitar guardar búsquedas erróneas.
            // El guardado exitoso se manejará en el componente padre (Layout) o hook de weather
            // cuando la API responda correctamente.
            
            setInputValue("");
            setShowSuggestions(false);
            setIsFocused(false); // Quitamos foco para ocultar historial
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        // Al seleccionar una sugerencia, usamos el nombre y país para buscar
        const searchTerm = `${suggestion.name}, ${suggestion.country || ''}`;
        onSearch(searchTerm);
        
        // Almacenar sugerencia en historial
        // addToHistory(suggestion); // NOTA: Deshabilitado para centralizar el guardado en Layout

        setInputValue("");
        setSelectedIndex(-1);
        setShowSuggestions(false);
    };

    const handleHistorySelect = (historyItem) => {
        // Si es manual, usamos el nombre, si es objeto completo, usamos la lógica de sugerencia
        if (historyItem.isManual) {
            onSearch(historyItem.name);
        } else {
            const searchTerm = `${historyItem.name}, ${historyItem.country || ''}`;
            onSearch(searchTerm);
        }
        // No llamamos a addToHistory aquí porque Layout se encargará cuando la búsqueda sea exitosa
        
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        // Si no hay sugerencias visibles, no hacemos nada especial
        if (!showSuggestions || !suggestions || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault(); // Evitar mover el cursor en el input
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                e.preventDefault(); // Evitar el submit del formulario
                handleSelectSuggestion(suggestions[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setShowSuggestions(false); // Solo ocultamos la lista
        }
    };

    const handleBlur = () => {
        // Pequeño delay para permitir clic en el historial antes de cerrar
        setTimeout(() => {
            setIsFocused(false);
            setShowSuggestions(false);
        }, 200);
    };

    return (
        <>
            <h1 className={styles.title}>How's the sky looking today</h1>
            {/*Se usa form como contenedor semántico, sin la necesidad de atributos.*/}
            <form id="form-container" name="form" onSubmit={handleSubmit}>
                <div className={styles["search-container"]}>
                    <div className={styles["input-container"]}>
                        <input 
                            className={styles["field-styles"]} 
                            type="text" 
                            placeholder="Search for a place..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => {
                                setIsFocused(true);
                                setShowSuggestions(true);
                            }}
                            onBlur={handleBlur}
                        />
                        
                        {/* Lista de sugerencias: Solamente muestra el contenedor ... */}
                        {inputValue && showSuggestions && (suggestionsLoading || suggestionsError || suggestions.length > 0) && (
                            <ul ref={suggestionsListRef} className={styles.suggestionsList}>
                                {suggestionsLoading && <li className={styles.loadingItem}>Loading...</li>}
                                
                                {!suggestionsLoading && suggestionsError && (
                                    <li className={styles.errorItem}>{suggestionsError}</li>
                                )}

                                {!suggestionsLoading && suggestions.map((suggestion, index) => (
                                    <li 
                                        key={suggestion.id} 
                                        // Usamos onMouseDown en lugar de onClick para evitar que el blur ocurra antes
                                        onMouseDown={() => handleSelectSuggestion(suggestion)}
                                        className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ''}`}
                                    >
                                        {suggestion.name}, {suggestion.country || ''} {suggestion.admin1 ? `(${suggestion.admin1})` : ''}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Mostrar historial si no hay input y tenemos foco */}
                        {!inputValue && isFocused && history.length > 0 && (
                            <div className={styles.suggestionsList}>
                                <p className={styles.historyTitle}>Últimas búsquedas</p>
                                <ul>
                                    {history.map((item, index) => (
                                        <li 
                                            key={item.id || index}
                                            onMouseDown={() => handleHistorySelect(item)}
                                            className={styles.suggestionItem}
                                        >
                                            <span style={{ marginRight: '8px' }}>📍</span>
                                            {item.isManual ? item.name : `${item.name}, ${item.country || ''}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {isLoading && <SearchInProgress />}
                    </div>
                    <button className={styles["search-button"]} type="submit">Search</button>
                </div>
            </form>
        </>
    )
}

export default Search;