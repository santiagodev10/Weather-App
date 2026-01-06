import Header from './Header/Header';
import Search  from './Search/Search';
import WeatherSummary from './WeatherSummary/WeatherSummary';
import DailyForecast from './DailyForecast/DailyForecast';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Search />
                <WeatherSummary />
                <DailyForecast />
            </main>
        </>
    );
};

export default Layout;