import styles from "./SearchInProgress.module.css"
import iconLoading from "./../../../../public/images/icon-loading.svg"

const SearchInProgress = () => {
    return (
        <div className={styles["search-in-progress-container"]}>
            <p className={styles["search-in-progress-paragraph"]}>
                <img className={styles["spinner-image"]} src={iconLoading} alt="loading icon" />
                Search in progress...
            </p>
        </div>
    )
}

export default SearchInProgress;