import { useState } from 'react';
import styles from "./Search.module.css"

const Search = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue);
            setInputValue(""); 
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
                        />
                    </div>
                    <button className={styles["search-button"]} type="submit">Search</button>
                </div>
            </form>
        </>
    )
}

export default Search;