import { useState, useRef, useMemo } from 'react';
import styles from "./Search.module.css"
import SearchInProgress from './SearchInProgress';
import useAutocomplete from '../../../hooks/UseAutocomplete';
import { useSearchHistory } from '../../../hooks/UseSearchHistory';
import useKeyboardNavigation from '../../../hooks/UseKeyboardNavigation';

// --- VISUALIZACIÓN DE DATOS (HOOK INTERMEDIO) ---
const useSearchLists = (inputValue, isFocused) => {
    const { history } = useSearchHistory();
    const { suggestions, loading, error } = useAutocomplete(inputValue);
    
    // 1. Preparamos lista de HISTORIAL
    const historyItems = useMemo(() => {
        // El historial solo se muestra si NO hay input y tenemos foco (o lógica similar)
        if (!isFocused || inputValue.length > 0) return [];
        return history.map((h, i) => ({
            id: `hist-${h.id || i}`, // IDs únicos
            mainText: h.isManual ? h.name : `${h.name}, ${h.country || ''}`,
            subText: 'Reciente',
            isHistory: true,
            searchTerm: h.name // Término limpio para buscar
        }));
    }, [history, isFocused, inputValue]);

    // 2. Preparamos lista de SUGERENCIAS
    const suggestionItems = useMemo(() => {
        if (inputValue.length === 0) return [];
        return suggestions.map((s, i) => ({
            id: `sugg-${s.id || i}`,
            mainText: `${s.name}, ${s.country || ''}`,
            subText: s.admin1 || '',
            isHistory: false,
            searchTerm: `${s.name}, ${s.country || ''}`
        }));
    }, [suggestions, inputValue]);

    // 3. Determinamos cuál es la lista ACTIVA para la navegación y visualización
    const activeList = inputValue.length > 0 ? suggestionItems : historyItems;
    const mode = inputValue.length > 0 ? 'suggestions' : (historyItems.length > 0 ? 'history' : 'none');

    return { 
        historyItems, 
        suggestionItems, 
        activeList, 
        mode,
        loading, 
        error 
    };
};

const Search = ({ onSearch, isLoading }) => {
    const [inputValue, setInputValue] = useState("");
    const [showComponent, setShowComponent] = useState(false); // Visibilidad general del dropdown
    const [isFocused, setIsFocused] = useState(false);
    const listRef = useRef(null);

    // Obtenemos las listas separadas y la "activa"
    const { 
        activeList, 
        mode, 
        loading: suggestionsLoading, 
        error: suggestionsError 
    } = useSearchLists(inputValue, isFocused);

    // Lógica unificada de ejecución
    const performSearch = (term) => {
        if (!term) return;
        onSearch(term);
        setInputValue("");
        setShowComponent(false);
        setIsFocused(false);
    };

    const handleSelection = (item) => performSearch(item.searchTerm);

    // --- HOOK DE TECLADO ---
    // Ahora consume solo la lista que está visible lógicamente (activeList)
    const isListVisible = showComponent && activeList.length > 0 && !suggestionsLoading && !suggestionsError;
    
    const { activeIndex, handleKeyDown } = useKeyboardNavigation(
        activeList, 
        isListVisible,
        handleSelection,
        { initialIndex: -1, scrollContainerRef: listRef }
    );

    const handleInputKeyDown = (e) => {
        if (e.key === 'Escape') {
            setShowComponent(false);
            setIsFocused(false);
        } else {
            handleKeyDown(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Si el usuario da Enter sin seleccionar nada, enviamos el input
        // Si seleccionó con teclado, el hook ya ejecutó handleSelection => performSearch
        if (inputValue.trim()) {
            performSearch(inputValue.trim());
        }
    };

    const handleBlur = () => setTimeout(() => {
        setIsFocused(false);
        setShowComponent(false);
    }, 200);

    return (
        <>
            <h1 className={styles.title}>How's the sky looking today</h1>
            <form id="form-container" name="form" onSubmit={handleSubmit}>
                <div className={styles["search-container"]}>
                    <div className={styles["input-container"]}>
                        <input 
                            className={styles["field-styles"]} 
                            type="text" 
                            placeholder="Search for a place..." 
                            value={inputValue}
                            onChange={(e) => { setInputValue(e.target.value); setShowComponent(true); }}
                            onKeyDown={handleInputKeyDown}
                            onFocus={() => { setIsFocused(true); setShowComponent(true); }}
                            onBlur={handleBlur}
                        />

                        {/* RENDERIZADO CONDICIONAL DE UI */}
                        {isListVisible && (
                            <div className={styles.suggestionsList}>
                                
                                {/* CABECERA OPCIONAL PARA HISTORIAL */}
                                {mode === 'history' && <p className={styles.historyTitle}>Últimas búsquedas</p>}

                                <ul ref={listRef}>
                                    {activeList.map((item, index) => (
                                        <li 
                                            key={item.id} 
                                            onMouseDown={() => handleSelection(item)}
                                            className={`${styles.suggestionItem} ${index === activeIndex ? styles.selected : ''}`}
                                        >
                                            {item.isHistory && <span style={{ marginRight: '8px' }}>📍</span>}
                                            {item.mainText} 
                                            {item.subText && <small> ({item.subText})</small>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* ESTADOS DE CARGA / ERROR (Solo sugerencias) */}
                        {inputValue && suggestionsLoading && (
                            <div className={styles.suggestionsList}><li className={styles.loadingItem}>Loading...</li></div>
                        )}
                        {inputValue && suggestionsError && (
                            <div className={styles.suggestionsList}><li className={styles.errorItem}>{suggestionsError}</li></div>
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