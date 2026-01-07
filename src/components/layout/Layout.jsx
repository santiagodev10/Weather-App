import styles from "./Layout.module.css"
import Header from './Header/Header';
import Search  from './Search/Search';
import WeatherSummary from './WeatherSummary/WeatherSummary';
import DailyForecast from './DailyForecast/DailyForecast';
import HourlyForecast from './HourlyForecast/HourlyForecast';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Search />
                <div className={styles["weather-info-wrapper"]}>
                    <WeatherSummary />
                    <DailyForecast />
                    <HourlyForecast />
                </div>
            </main>
        </>
    );
};

export default Layout;