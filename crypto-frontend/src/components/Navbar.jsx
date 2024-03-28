import TotalCoinInfo from "./TotalCoinInfo";
import SearchBar from "./SearchBar";
import { FaHome } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ setSearchQuery, user }) => {
    return (
        <nav className="max-w-screen-fit flex flex-wrap items-center justify-between p-4 bg-slate-700">
            <TotalCoinInfo />
            <SearchBar setSearchQuery={setSearchQuery} />
            <div className="flex items-center">
                <a href="/" className="mr-6"><FaHome className="text-blue-500 hover:text-white" size={30} /></a>
                <a href="/" className="mr-6"><MdDarkMode className="text-blue-500 hover:text-white" size={30} /></a>
                { user ?
                    <div>
                        <a href="/dashboard"><CgProfile className="text-blue-500 hover:text-white" size={30} /></a>
                        <a href="/logout">Logout</a>
                    </div>
                    :
                    <a href="/login"><CgProfile className="text-blue-500 hover:text-white" size={30} /></a>
                }
            </div>
        </nav>
    );
}

export default Navbar;