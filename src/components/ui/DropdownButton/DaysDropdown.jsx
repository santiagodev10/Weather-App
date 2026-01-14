import { useState } from "react";
import styles from "./DropdownButton.module.css";
import BaseDropdown from "./BaseDropdown";

const DaysDropdown = ({ days, onSelectDay }) => {
    const formattedDays = days.map(letter => letter.charAt(0).toUpperCase() + letter.slice(1));
    const [selectedDay, setSelectedDay] = useState(formattedDays[0]);

    const handleSelect = (day) => {
        setSelectedDay(day);
        onSelectDay(day);
    };    

    return (
        <BaseDropdown label={selectedDay} colorBackground="color-background-days">
            {formattedDays.map((day, index) => (
                <li 
                    key={index} 
                    onClick={() => handleSelect(day)} 
                    className={`${styles["dropdown-item"]} ${selectedDay === day ? styles["dropdown-item-selected"] : ""}`}
                >
                    {day}
                </li>
            ))}
        </BaseDropdown>
    );
};

export default DaysDropdown;
