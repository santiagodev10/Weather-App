import { useState } from "react";
import iconDropdown from "../../../assets/images/icon-dropdown.svg";
import iconUnits from "../../../assets/images/icon-units.svg";
import styles from "./DropdownButton.module.css";

const DropdownButton = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={styles["dropdown-container"]}>
            <button className={styles["dropdown-button"]} onClick={toggleDropdown} type="button">
                <img src={iconUnits} alt="Units Icon" />
                Units
                <img src={iconDropdown} alt="Dropdown Icon" />
            </button>
            {isOpen && (
                <ul className={styles["dropdown-menu"]}>
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleSelect(option)} className="dropdown-item">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropdownButton;