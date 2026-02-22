import { useState, useEffect } from "react";
import styles from "./DropdownButton.module.css";
import BaseDropdown from "./BaseDropdown";
import DropdownButtonLoading from "./DropdownButtonLoading";

const DaysDropdown = ({ days = [], onSelectDay, isLoading }) => {
    
    // Función auxiliar para obtener el nombre del día desde la fecha (ej: "Tuesday")
    const getDayName = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Ajustamos la zona horaria para evitar problemas con la conversión local si es necesario, 
        // pero Open-Meteo suele dar fechas en YYYY-MM-DD simples.
        // Usamos UTC para asegurar que el día sea constante si la fecha viene sin hora.
        const dayName = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
            .toLocaleDateString('en-US', { weekday: 'long' });
        return dayName;
    };

    const [selectedDay, setSelectedDay] = useState("");

    // Cuando recibimos los datos de la API (days), seleccionamos el primero por defecto
    useEffect(() => {
        if (days && days.length > 0) {
            setSelectedDay(days[0]);
        }
    }, [days]);

    const handleSelect = (dayDate) => {
        setSelectedDay(dayDate);
        if (onSelectDay) {
            onSelectDay(dayDate); // Le avisamos al padre cual fecha se eligió
        }
    };

    // Si no hay días cargados todavía, no mostramos nada o un estado de carga
    if ((!days || days.length === 0) && !isLoading) return null;

    const selectedDayLabel = getDayName(selectedDay);

    return (
        <BaseDropdown label={isLoading ? <DropdownButtonLoading /> : selectedDayLabel} colorBackground="color-background-days" hoverBackground="dropdown-button-days">
            {days.map((dayDate, index) => {
                const dayNameDisplay = getDayName(dayDate);
                const isSelected = selectedDay === dayDate;
                
                return (
                    <li 
                        key={index} 
                        onClick={() => handleSelect(dayDate)} 
                        className={`${styles["dropdown-item"]} ${isSelected ? styles["dropdown-item-selected"] : ""}`}
                    >
                        {dayNameDisplay}
                    </li>
                );
            })}
        </BaseDropdown>
    );
};

export default DaysDropdown;
