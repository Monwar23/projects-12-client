import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const AllDonation = () => {

    const axiosSecure = useAxiosSecures()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState(null);


    const {
        data: campaignsPet = [],
        isLoading,refetch
    } = useQuery({
        queryKey: ['campaignsPet'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/campaignsPets`)
            return data
        },
    })

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

    const handleDeletePet = pet => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F472B6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/campaignsPets/${pet._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div>
             <Helmet>
                <title>LovingPets | All Donation</title>
            </Helmet>
            <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Pet Name</th>
                                <th className="text-center">Pet Image</th>
                                <th className="text-center">Last Date of <br /> Donation</th>
                                <th className="text-center">Maximum Donation <br /> Amount</th>
                                <th className="text-center">Donated <br /> Amount</th>
                                <th className="text-center">Pause</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaignsPet.map((donation, index) => (
                                <tr key={donation.id}>
                                    <th className="">{index + 1}</th>
                                    <td className="text-center">{donation.pet_name}</td>
                                    <td className="flex justify-center">
                                        <img className="rounded-full lg:w-20 h-10 w-10 lg:h-20" src={donation.pet_image_url} alt="" />
                                    </td>
                                    <td className="text-center">${new Date(donation.last_date_of_donation).toLocaleDateString()}</td>
                                    <td className="text-center">${donation.maximum_donation_amount}</td>
                                    <td className="text-center">${donation.donated_amount}</td>
                                    <td className="text-center">
                                      
                                      <button onClick={() => handlePauseClick(donation)} className="btn border border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500">
                                          {donation.status === 'paused' ? 'Unpaused' : 'Paused'}
                                      </button>
                                  </td>    
                                    <td className="flex justify-center">
                                    <Link to={`/dashboard/EditDonationAdmin/${donation._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-red-600" />
                                        </button>
                                        </Link>
                                        <button onClick={() => handleDeletePet(donation)} className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default AllDonation;