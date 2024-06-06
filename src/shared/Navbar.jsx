import { MdOutlinePets } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import { useEffect, useState } from "react";

const Navbar = () => {

    const { user, logOut } = UseAuth()
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };


    const navLinks = <>
        <li><NavLink className={({ isActive }) =>
            isActive ? 'text-pink-500 border border-pink-500 font-semibold' : 'font-semibold hover:text-pink-500'
        } to="/">Home</NavLink></li>

        <li><NavLink className={({ isActive }) =>
            isActive ? 'text-pink-500 border border-pink-500 font-semibold' : 'font-semibold hover:text-pink-500'
        } to="/petListing">Pet Listing</NavLink></li>

        <li><NavLink className={({ isActive }) =>
            isActive ? 'text-pink-500 border border-pink-500 font-semibold' : 'font-semibold hover:text-pink-500'
        } to="/donationCampaigns">Donation Campaigns</NavLink></li>
    </>


    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md">
                <MdOutlinePets />
                </div>
                <Link to="/" className="btn btn-ghost text-xl ">Loving<span className="font-bold text-pink-500 -ml-2">Pets</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">

                {user ? (
                    <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div title={user?.displayName} className='w-10 rounded-full'>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile Photo'
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <NavLink to='/dashboard' className={({ isActive }) =>
                                    isActive ? 'text-pink-500 border border-pink-500 font-semibold' : 'font-semibold hover:text-pink-500'
                                }>
                                   Dashboard
                                </NavLink>
                            </li>
                           
                            <li className='mt-2'>
                                <button
                                    onClick={logOut}
                                    className=' hover:text-pink-500 font-semibold  text-center'
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to='/login'>
                            <button className="btn btn-outline border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none mr-3 px-6">Login</button>
                        </Link>

                    </>
                )}
                <label className="cursor-pointer grid place-items-center ml-3">
                    <input onChange={toggleTheme} type="checkbox" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
                        checked={theme === 'dark'} />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;