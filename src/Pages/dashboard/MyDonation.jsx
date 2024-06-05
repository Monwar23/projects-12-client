import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import UseAuth from "../../hooks/UseAuth";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MyDonation = () => {

    const axiosSecure=useAxiosSecures()
    const {user}=UseAuth()

    const { data: allDonation = [], isLoading, refetch } = useQuery({
        queryKey: ['allDonation', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/payments/email/${user?.email}`);
            return data;
        },
    });

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
             <Helmet>
                <title>LovingPets | My Donation</title>
            </Helmet>
            <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Pet Name</th>
                                <th className="text-center">Pet Image</th>
                                <th className="text-center">Donated Amount</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDonation.map((donation, index) => (
                                <tr key={donation.id}>
                                    <th className="">{index + 1}</th>
                                    <td className="text-center">{donation.pet_name}</td>
                                    <td className="flex justify-center">
                                        <img className="rounded-full w-20 h-10 lg:h-20" src={donation.pet_Image_url} alt="" />
                                    </td>
                                    <td className="text-center">${donation.donated_amount}</td>
                                                         
                                    <td className="text-center">
                                    <Link >
                                        <button className="btn border border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500">
                                            Refund
                                        </button>
                                        </Link>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default MyDonation;