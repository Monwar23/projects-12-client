import UseAuth from "../../hooks/UseAuth";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";

const AdoptionRequest = () => {

    const axiosSecure = useAxiosSecures();
    const { user } = UseAuth()

    const { data: adopts = [], isLoading, refetch } = useQuery({
        queryKey: ['adopt', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/adopt/email/${user?.email}`);
            return data;
        },
    });
    const handleMakeAccepted = adopt => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F472B6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept this Adopt Request!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/adopt/${adopt._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: `Request accepted`,
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }


    if (isLoading) return <LoadingSpinner />;



    return (
        <div>
            <Helmet>
                <title>LovingPets | Adoption Request</title>
            </Helmet>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl text-center text-pink-500 mb-5">Total Adopt Request : {adopts.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Pet Name</th>
                                <th className="text-center">Pet Image</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Phone Number</th>
                                <th className="text-center">Location</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adopts.map((adopt, index) => <tr key={adopt._id}>
                                    <th className="text-center">{index + 1}</th>
                                    <td className="text-center">{adopt.pet_name}</td>
                                    <td className="text-center">
                                        <img className="rounded-full lg:w-20 w-10 h-10 lg:h-20" src={adopt.pet_image_url} alt="" />
                                    </td>
                                    <td className="text-center">{adopt.name}</td>
                                    <td className="text-center">{adopt.requestedEmail}</td>
                                    <td className="text-center">{adopt.phone_number}</td>
                                    <td className="text-center">{adopt.address}</td>
                                    <td className="text-center">
                                        {adopt.status === 'accepted' ? 'Accepted' : <button
                                            onClick={() => handleMakeAccepted(adopt)}
                                            className="btn border-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500">
                                            Pending
                                        </button>}
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdoptionRequest;