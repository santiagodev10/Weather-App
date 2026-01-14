import { useState } from "react";
import styles from "./DropdownButton.module.css";

const iconDropdown = "/images/icon-dropdown.svg";

const BaseDropdown = ({ label, icon, children, colorBackground }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles["dropdown-container"]}>
            <button className={`${styles["dropdown-button"]} ${styles[colorBackground]}`} onClick={toggleDropdown} type="button">
                {icon && <img className={styles["icon-styles"]} src={icon} alt="Icon" />}
                {label}
                <img 
                    className={`${styles["dropdown-icon"]} ${isOpen ? styles.rotate : ""}`} 
                    src={iconDropdown} 
                    alt="Dropdown Icon" 
                />            
            </button>
            
            {isOpen && (
                <ul className={styles["dropdown-menu"]}>
                    {children}
                </ul>
            )}
        </div>
    );
}

export default BaseDropdown;
