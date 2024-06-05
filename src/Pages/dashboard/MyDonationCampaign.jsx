import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import UseAuth from "../../hooks/UseAuth";
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const MyDonationCampaign = () => {
    const axiosSecure = useAxiosSecures();
    const { user } = UseAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const { data: allCampaigns = [], isLoading, refetch } = useQuery({
        queryKey: ['allCampaigns', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/campaignsPet/email/${user?.email}`);
            return data;
        },
    });

    const calculateProgress = (donatedAmount, maximumAmount) => {
        return (donatedAmount / maximumAmount) * 100;
    };

    const handlePauseClick = (campaign) => {
        setSelectedCampaign(campaign);
        setNewStatus(campaign.status);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCampaign(null);
    };

    const handleStatusChange = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.patch(`/campaignsPet/${selectedCampaign._id}`, { status: newStatus });
            refetch();
            handleCloseModal();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Campaign status updated to ${newStatus}!`,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>LovingPets | My Donation Campaigns</title>
            </Helmet>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl text-center text-pink-500 mb-5">Total Campaigns: {allCampaigns.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Pet Name</th>
                                <th className="text-center">Maximum Donation Amount</th>
                                <th className="text-center">Donation Progress</th>
                                <th className="text-center">Action</th>
                                <th className="text-center">Pause</th>
                                <th className="text-center">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCampaigns.map((donation, index) => (
                                <tr key={donation.id}>
                                    <th className="text-center">{index + 1}</th>
                                    <td className="text-center">{donation.pet_name}</td>
                                    <td className="text-center">{donation.maximum_donation_amount}</td>
                                    <td className="text-center">
                                        <progress className="progress progress-success w-56" value={calculateProgress(donation.donated_amount, donation.maximum_donation_amount)} max="100"></progress>
                                    </td>
                                   
                                    <td className="text-center">
                                    <Link to={`/dashboard/EditDonation/${donation._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-red-600" />
                                        </button>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                      
                                        <button onClick={() => handlePauseClick(donation)} className="btn border border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500">
                                            {donation.status === 'paused' ? 'Unpaused' : 'Paused'}
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn border border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500">
                                            View Donation
                                        </button>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-bold text-lg text-center text-pink-500 mb-4">Change Campaign Status</h3>
                        <form onSubmit={handleStatusChange}>
                            <div className="form-control">
                                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="select select-bordered focus:border-pink-500 border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500">
                                    <option value="paused">Paused</option>
                                    <option value="unpaused">Unpaused</option>
                                </select>
                            </div>
                            <div className="modal-action mt-6">
                                <button type="submit" className="btn border-b-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500">Save</button>
                                <button type="button" onClick={handleCloseModal} className="btn bg-red-500 text-white">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationCampaign;
