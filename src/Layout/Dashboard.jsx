import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaDonate, FaUsers } from "react-icons/fa";
import { MdAdd, MdCampaign, MdPets, MdRequestPage } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import Navbar from "../shared/Navbar";

const Dashboard = () => {
    const [role] = useAdmin()

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex">
                <div className="w-64 min-h-screen bg-pink-400">
                    <ul className="menu p-4">
                        {
                            role === 'admin' ? <>

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
                        <div className="divider"></div>

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
          
        </div>
    );
};

export default Dashboard;