import TotalCoinInfo from "./TotalCoinInfo";
import SearchBar from "./SearchBar";
import * as userService from '../services/users-service';
import { FaHome } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const Navbar = ({ setSearchQuery, user, setUser }) => {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav className="max-w-screen-fit flex flex-wrap items-center justify-between p-4 bg-slate-700">
            <TotalCoinInfo />
            <SearchBar setSearchQuery={setSearchQuery} />
            <div className="flex items-center">
                <Link to="/" className="mr-6"><FaHome className="text-blue-500 hover:text-white" size={30} /></Link>
                <Link to="/" className="mr-6"><MdDarkMode className="text-blue-500 hover:text-white" size={30} /></Link>
                { user ?
                    <div>
                        <Link to="/dashboard"><CgProfile className="text-blue-500 hover:text-white" size={30} /></Link>
                        <Link onClick={googleLogout()}>Logout</Link>
                    </div>
                    :
                    <Link to="/login"><CgProfile className="text-blue-500 hover:text-white" size={30} /></Link>
                }
            </div>
        </nav>
    );
}

export default Navbar;