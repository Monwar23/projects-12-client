import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaDonate, FaUsers } from "react-icons/fa";
import { MdAdd, MdCampaign, MdPets, MdRequestPage } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import Navbar from "../shared/Navbar";

const Dashboard = () => {
    const [role] = useAdmin();

    const navLinkStyles = ({ isActive }) => 
        isActive ? "bg-white text-pink-400 font-semibold mt-2" : "font-semibold hover:text-white mt-2";

    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-64 min-h-screen bg-pink-400 ">
                    <ul className="menu p-4">
                        {role === 'admin' ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/addAPets" className={navLinkStyles}>
                                        <MdAdd />
                                        Add A pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myAddedPets" className={navLinkStyles}>
                                        <IoBagAdd />
                                        My Added Pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adoptionRequest" className={navLinkStyles}>
                                        <MdRequestPage />
                                        Adoption Request
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/createDonationCampaign" className={navLinkStyles}>
                                        <MdCampaign />
                                        Create Donation Campaign
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myDonationCampaigns" className={navLinkStyles}>
                                        <TbBrandCampaignmonitor />
                                        My Donation Campaigns
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myDonations" className={navLinkStyles}>
                                        <MdCampaign />
                                        My Donations
                                    </NavLink>
                                </li>
                                <div className="divider"></div>
                                <li>
                                    <NavLink to="/dashboard/user" className={navLinkStyles}>
                                        <FaUsers />
                                        All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allPets" className={navLinkStyles}>
                                        <MdPets />
                                        All Pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allDonation" className={navLinkStyles}>
                                        <FaDonate />
                                        All Donation
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/addAPets" className={navLinkStyles}>
                                        <MdAdd />
                                        Add A pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myAddedPets" className={navLinkStyles}>
                                        <IoBagAdd />
                                        My Added Pets
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adoptionRequest" className={navLinkStyles}>
                                        <MdRequestPage />
                                        Adoption Request
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/createDonationCampaign" className={navLinkStyles}>
                                        <MdCampaign />
                                        Create Donation Campaign
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myDonationCampaigns" className={navLinkStyles}>
                                        <TbBrandCampaignmonitor />
                                        My Donation Campaigns
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myDonations" className={navLinkStyles}>
                                        <MdCampaign />
                                        My Donations
                                    </NavLink>
                                </li>
                            </>
                        )}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/dashboard/profile" className={navLinkStyles}>
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
