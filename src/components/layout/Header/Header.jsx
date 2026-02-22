import styles from './Header.module.css';
import UnitsDropdown from '../../ui/DropdownButton/UnitsDropdown';

const Header = ({ onUnitChange }) => {
    return (
        <header className={styles['header-container']}>
            <img className={styles.logo} src="/images/logo.svg" alt="Weather App Logo" />
            <UnitsDropdown 
                temperature={['Celsius (°C)', 'Fahrenheit (°F)']} 
                onSelectTemp={onUnitChange?.temp}
                windSpeed={["km/h", "mph"]}
                onSelectWind={onUnitChange?.wind}
                precipitation={["Millimeters (mm)", "Inches (in)"]}
                onSelectPrep={onUnitChange?.prep}
            />
        </header>
    )
}

export default Header;