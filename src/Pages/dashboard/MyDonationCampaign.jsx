import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import UseAuth from "../../hooks/UseAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyDonationCampaign = () => {
    const axiosSecure = useAxiosSecures();
    const { user } = UseAuth();

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

    return (
        <div>
            <Helmet>
                <title>LovingPets | My Donation Campaigns</title>
            </Helmet>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl text-center text-pink-500 mb-5">Total Users: {allCampaigns.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Pet Name</th>
                                <th className="text-center">Maximum Donation Amount</th>
                                <th className="text-center">Donated Amount</th>
                                <th className="text-center">Donation Progress</th>
                                <th className="text-center">Pause</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allCampaigns.map((donation, index) => (
                                    <tr key={donation.id}>
                                        <th className="text-center">{index + 1}</th>
                                        <td className="text-center">{donation.pet_name}</td>
                                        <td className="text-center">{donation.maximum_donation_amount}</td>
                                        <td className="text-center">{donation.donated_amount}</td>
                                        <td className="text-center">
                                            <progress className="progress progress-success w-56" value={calculateProgress(donation.donated_amount, donation.maximum_donation_amount)} max="100"></progress>
                                        </td>
                                        <td className="text-center">Pause</td>
                                        <td className="text-center">
                                            <button
                                                // onClick={() => handleEditCampaign(donation.id)}
                                                className="btn btn-ghost btn-lg"
                                            >
                                                <FaEdit className="text-red-600"></FaEdit>
                                            </button>
                                            <button
                                                // onClick={() => handleDeleteCampaign(donation.id)}
                                                className="btn btn-ghost btn-lg"
                                            >
                                                <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyDonationCampaign;
