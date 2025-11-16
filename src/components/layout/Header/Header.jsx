import styles from './Header.module.css';
import Logo from '../../../assets/images/logo.svg';
import DropdownButton from '../../sections/DropdownButton/DropdownButton';

const Header = () => {
    return (
        <header className={styles['header-container']}>
            <img className={styles.logo} src={Logo} alt="Weather App Logo" />
            <DropdownButton 
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