import TotalCoinInfo from "./TotalCoinInfo";
import SearchBar from "./SearchBar";

const Navbar = ({ setSearchQuery }) => {
    return (
        <nav className="navbar">
            <TotalCoinInfo />
            <SearchBar setSearchQuery={setSearchQuery} />
            <h1>Crypto Tracker</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/dashboard">Portfolio</a>
                <a href="/">Logout</a>
                <a href="/login">Login</a>
                <a href="/register">Signup</a>
            </div>
        </nav>
    );
}

export default Navbar;