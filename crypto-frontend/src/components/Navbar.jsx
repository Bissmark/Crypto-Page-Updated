import { useState } from "react";
import TotalCoinInfo from "./TotalCoinInfo";
import SearchBar from "./SearchBar";
import * as userService from '../services/users-service';
import { FaHome } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = ({ setSearchQuery, user, setUser }) => {
    const [openNav, setOpenNav] = useState(false);

    const handleDropDown = () => {
        setOpenNav(!openNav);
    };

    function handleLogOut() {
        userService.logOut();
        handleDropDown();
        setUser(null);
    }

    return (
        <nav className="max-w-screen-fit flex flex-wrap items-center justify-between p-4 bg-slate-700">
            <TotalCoinInfo />
            <SearchBar setSearchQuery={setSearchQuery} />
            <div className="flex items-center">
                <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-blue-500 dark:focus:ring-gray-600" onClick={handleDropDown}>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden md:flex">
                    <Link to="/" className="mr-6"><FaHome className="text-blue-500 hover:text-white" size={30} /></Link>
                    <MdDarkMode className="text-blue-500 hover:text-white mr-6" size={30} />
                    {user ? (
                        <CgProfile className="text-blue-500 hover:text-white" size={30} />
                    ) : (
                        <Link to="/login"><CgProfile className="text-blue-500 hover:text-white" size={30} /></Link>
                    )}
                </div>
                <div className={`w-full flex items-center md:hidden ${openNav ? 'block' : 'hidden'}`}>
                    { user &&
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                            <li><Link to="/dashboard" className='py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent' onClick={handleDropDown}>Dashboard</Link></li>
                            <li><Link onClick={handleLogOut} className='py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent'>Logout</Link></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
