import { useState, useEffect, useRef } from 'react';
import styles from "./Search.module.css"
import SearchInProgress from './SearchInProgress';
import useAutocomplete from '../../../hooks/UseAutocomplete';

const Search = ({ onSearch, isLoading }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(true); // Controlar visibilidad
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
            setInputValue("");
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        // Al seleccionar una sugerencia, usamos el nombre y país para buscar
        onSearch(`${suggestion.name}, ${suggestion.country}`);
        setInputValue("");
        setSelectedIndex(-1);
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
                            onFocus={() => setShowSuggestions(true)} // Volver a mostrar al enfocar
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
                                        onClick={() => handleSelectSuggestion(suggestion)}
                                        className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ''}`}
                                    >
                                        {suggestion.name}, {suggestion.country || ''} {suggestion.admin1 ? `(${suggestion.admin1})` : ''}
                                    </li>
                                ))}
                            </ul>
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