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
                <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-blue-500 dark:focus:ring-gray-600" onClick={handleDropDown}>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden md:flex">
                    <Link to="/" className="mr-6"><FaHome className="text-blue-500 hover:text-white" size={30} /></Link>
                    <MdDarkMode className="text-blue-500 hover:text-white mr-6" size={30} />
                    {user ? (
                        <div className="relative">
                            <CgProfile className="text-blue-500 hover:text-white cursor-pointer" size={30} onClick={handleDropDown} />
                            {openNav && (
                                <div className="absolute right-0 mt-3 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-200">
                                    <ul className="py-2">
                                        <li><Link to="/dashboard" onClick={handleDropDown} className="block px-4 py-2 text-white hover:text-blue-700">Dashboard</Link></li>
                                        <li><Link onClick={handleLogOut} className="block px-4 py-2 text-white hover:text-blue-700">Logout</Link></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login"><CgProfile className="text-blue-500 hover:text-white" size={30} /></Link>
                    )}
                </div>
                { user &&
                    <div className={`w-80 flex justify-center ml-1 sm:hidden ${openNav ? 'block' : 'hidden'}`}>
                        <ul className="w-full flex flex-col justify-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li><Link to="/dashboard" className='py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent' onClick={handleDropDown}>Dashboard</Link></li>
                            <li><Link onClick={handleLogOut} className='py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent'>Logout</Link></li>
                        </ul>
                    </div>
                }
        </nav>
    );
}

export default Navbar;
