import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaDonate, FaUsers } from "react-icons/fa";
import { MdAdd, MdCampaign, MdOutlinePets, MdPets, MdRequestPage } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import UseAuth from "../hooks/UseAuth";

const Dashboard = () => {
    const [role] = useAdmin()
    const { user, logOut } = UseAuth()

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-pink-400">
                <ul className="menu p-4">
                    <li className="">
                        <NavLink to="/" className="btn btn-ghost text-xl">
                        <MdOutlinePets className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md"/>
                        Loving<span className="font-bold text-pink-600 -ml-2">Pets</span>
                            </NavLink>
                    </li>
                    <div className="divider"></div>
                    {
                        role==='admin' ? <>

<li>
                                <NavLink to="/dashboard/addAPets">
                                <MdAdd />
                                    Add A pets</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myAddedPets">
                                <IoBagAdd />
                                    My Added Pets</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adoptionRequest">
                                <MdRequestPage />
                                Adoption Request</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createDonationCampaign">
                                <MdCampaign />
                                Create Donation Campaign</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myDonationCampaigns">
                                <TbBrandCampaignmonitor />
                                My Donation Campaigns</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myDonations">
                                <MdCampaign />
                                My Donations</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/user">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/allPets'>
                                <MdPets />
                                    All Pets</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/allDonation">
                                <FaDonate />
                                    All Donation</NavLink>
                            </li>
                            

                        </> :
                            <>
                               <li>
                                <NavLink to="/dashboard/addAPets">
                                <MdAdd />
                                    Add A pets</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myAddedPets">
                                <IoBagAdd />
                                    My Added Pets</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adoptionRequest">
                                <MdRequestPage />
                                Adoption Request</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createDonationCampaign">
                                <MdCampaign />
                                Create Donation Campaign</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myDonationCampaigns">
                                <TbBrandCampaignmonitor />
                                My Donation Campaigns</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myDonations">
                                <MdCampaign />
                                My Donations</NavLink>
                            </li>
                            </>
                    }
                    
                    <li className='mt-2'>
                                <button
                                    onClick={logOut}
                                    className=' hover:text-pink-500 font-semibold  text-center'
                                >
                                    Logout
                                </button>
                            </li>
                    <li>
                        <NavLink to="/order/contact">
                            
                            Profile</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;