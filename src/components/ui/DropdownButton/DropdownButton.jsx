import { useState } from "react";
import styles from "./DropdownButton.module.css";

const iconDropdown = "/images/icon-dropdown.svg";
const iconUnits = "/images/icon-units.svg";

const DropdownButton = ({ temperature, onSelectTemp, windSpeed, onSelectWind, precipitation, onSelectPrep }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isImperial, setIsImperial] = useState("Switch to Imperial");
    const [selectedTemp, setSelectedTemp] = useState(null);
    const [selectedWind, setSelectedWind] = useState(null);
    const [selectedPrep, setSelectedPrep] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectTemp = (option) => {
        onSelectTemp(option);
        setSelectedTemp(option);
    };

    const handleSelectWind = (option) => {
        onSelectWind(option);
        setSelectedWind(option);
    }

    const handleSelectPrep = (option) => {
        onSelectPrep(option);
        setSelectedPrep(option);
    }

    const switchUnitSystem = () => {
        if (isImperial === "Switch to Imperial") {
            setIsImperial("Switch to Metric");
            handleSelectTemp("Fahrenheit (°F)");
            handleSelectWind("mph");
            handleSelectPrep("Inches (in)");
        } else {
            setIsImperial("Switch to Imperial");
            handleSelectTemp("Celsius (°C)");
            handleSelectWind("km/h");
            handleSelectPrep("Millimeters (mm)");
        }
    }

    return (
        <div className={styles["dropdown-container"]}>
            <button className={styles["dropdown-button"]} onClick={toggleDropdown} type="button">
                <img src={iconUnits} alt="Units Icon" />
                Units
                <img className={`${styles["dropdown-icon"]} ${isOpen ? styles.rotate : ""}`} src={iconDropdown} alt="Dropdown Icon" />            
            </button>
            
            {isOpen && (
                <ul className={styles["dropdown-menu"]}>
                    <button className={`${styles["switch-unit-system"]} ${styles["dropdown-item"]}`} onClick={switchUnitSystem}>{isImperial}</button>

                    <h2 className={styles["dropdown-label"]}>Temperature</h2>
                    {temperature.map((option, index) => (
                        <li key={index} onClick={() => handleSelectTemp(option)} className={`${styles["dropdown-item"]} ${selectedTemp === option ? styles["dropdown-item-selected"] : ""}`}>{option}</li>
                    ))}

                    <span className={styles.divisor}></span>

                    <h2 className={styles["dropdown-label"]}>Wind Speed</h2>
                    {windSpeed.map((option, index) => (
                        <li key={index} onClick={() => handleSelectWind(option)} className={`${styles["dropdown-item"]} ${selectedWind === option ? styles["dropdown-item-selected"] : ""}`}>{option}</li>
                    ))}

                    <span className={styles.divisor}></span>

                    <h2 className={styles["dropdown-label"]}>Precipitation</h2>
                    {precipitation.map((option, index) => (
                        <li key={index} onClick={() => handleSelectPrep(option)} className={`${styles["dropdown-item"]} ${selectedPrep === option ? styles["dropdown-item-selected"] : ""}`}>{option}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropdownButton;