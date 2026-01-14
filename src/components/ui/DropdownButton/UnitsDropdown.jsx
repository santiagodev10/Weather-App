import { useState } from "react";
import styles from "./DropdownButton.module.css";
import BaseDropdown from "./BaseDropdown";

const iconUnits = "/images/icon-units.svg";

const UnitsDropdown = ({ temperature, onSelectTemp, windSpeed, onSelectWind, precipitation, onSelectPrep }) => {
    const [isImperial, setIsImperial] = useState("Switch to Imperial");
    const [selectedTemp, setSelectedTemp] = useState(null);
    const [selectedWind, setSelectedWind] = useState(null);
    const [selectedPrep, setSelectedPrep] = useState(null);

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
        <BaseDropdown label="Units" icon={iconUnits} colorBackground="color-background-units">
            <button className={`${styles["switch-unit-system"]} ${styles["dropdown-item"]}`} onClick={switchUnitSystem}>
                {isImperial}
            </button>

            <h2 className={styles["dropdown-label"]}>Temperature</h2>
            {temperature.map((option, index) => (
                <li key={index} onClick={() => handleSelectTemp(option)} className={`${styles["dropdown-item"]} ${selectedTemp === option ? `${styles["dropdown-item-selected"]} ${styles["with-checkmark"]}` : ""}`}>
                    {option}
                </li>
            ))}

            <span className={styles.divisor}></span>

            <h2 className={styles["dropdown-label"]}>Wind Speed</h2>
            {windSpeed.map((option, index) => (
                <li key={index} onClick={() => handleSelectWind(option)} className={`${styles["dropdown-item"]} ${selectedWind === option ? `${styles["dropdown-item-selected"]} ${styles["with-checkmark"]}` : ""}`}>
                    {option}
                </li>
            ))}

            <span className={styles.divisor}></span>

            <h2 className={styles["dropdown-label"]}>Precipitation</h2>
            {precipitation.map((option, index) => (
                <li key={index} onClick={() => handleSelectPrep(option)} className={`${styles["dropdown-item"]} ${selectedPrep === option ? `${styles["dropdown-item-selected"]} ${styles["with-checkmark"]}` : ""}`}>
                    {option}
                </li>
            ))}
        </BaseDropdown>
    );
}

export default UnitsDropdown;