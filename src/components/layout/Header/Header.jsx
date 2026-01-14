import styles from './Header.module.css';
import UnitsDropdown from '../../ui/DropdownButton/UnitsDropdown';

const Header = () => {
    return (
        <header className={styles['header-container']}>
            <img className={styles.logo} src="/images/logo.svg" alt="Weather App Logo" />
            <UnitsDropdown 
                temperature={['Celsius (°C)', 'Fahrenheit (°F)']} 
                onSelectTemp={(temperatureSelect) => console.log(`Selected temperature unit: ${temperatureSelect}`)}
                windSpeed={["km/h", "mph"]}
                onSelectWind={(windSelect) => console.log(`Selected wind speed unit: ${windSelect}`)}
                precipitation={["Millimeters (mm)", "Inches (in)"]}
                onSelectPrep={(precipitationSelect) => console.log(`Selected precipitation unit: ${precipitationSelect}`)}
            />
        </header>
    )
}

export default Header;