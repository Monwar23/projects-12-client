import { MdOutlinePets } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const Navbar = () => {

    const { user, logOut } = UseAuth()

    // const handleSignOut = () => {
    //     logOut()
    // }

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
            </div>
        </div>
    );
};

export default Navbar;