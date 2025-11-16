import styles from './Header.module.css';
import Logo from '../../../assets/images/logo.svg';
import DropdownButton from '../../sections/DropdownButton/DropdownButton';

const Header = () => {
    return (
        <header className={styles['header-container']}>
            <img className={styles.logo} src={Logo} alt="Weather App Logo" />
            <DropdownButton 
                options={['Celsius', 'Fahrenheit']} 
                onSelect={(option) => console.log(`Selected temperature unit: ${option}`)} 
            />
        </header>
    )
}

export default Header;