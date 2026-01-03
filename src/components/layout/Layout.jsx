import Header from './Header/Header';
import Search  from './Search/Search';
import WeatherSummary from './WeatherSummary/WeatherSummary';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Search />
                <WeatherSummary />
            </main>
        </>
    );
};

export default Layout;