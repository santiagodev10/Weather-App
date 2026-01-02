import styles from "./Search.module.css"

const Search = () => {
    return (
        <>
            <h1 className={styles.title}>How's the sky looking today</h1>
            {/*Se usa form como contenedor semántico, sin la necesidad de atributos.*/}
            <form id="form-container" name="form">
                <div className={styles["search-container"]}>
                    <div className={styles["input-container"]}>
                        <input className={styles["field-styles"]} type="text" placeholder="Search for a place..." />
                    </div>
                    <button className={styles["search-button"]}>Search</button>
                </div>
            </form>
        </>
    )
}

export default Search;