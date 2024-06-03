import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AllPets = () => {

    const axiosSecure = useAxiosSecures()



    const {
        data: allPets = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/allPets`)
            return data
        },
    })


    return (
        <div>
            <Helmet>
                <title>LovingPets | All Pets</title>
            </Helmet>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl text-center text-pink-500 mb-5">Total Pets: {allPets.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Image</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Category</th>

                                <th className="text-center">Age</th>
                                <th className="text-center">Location</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allPets.map((pet, index) => <tr key={pet._id}>
                                    <th className="text-center">{index + 1}</th>
                                    <td className="flex justify-center"><img className="rounded-full w-20 h-10 lg:h-20" src={pet.pet_image_url} alt="" /></td>
                                    <td className="text-center">{pet.pet_name}</td>
                                    <td className="text-center">{pet.pet_category.value? pet.pet_category.value : pet.pet_category}</td>
                                    <td className="text-center">{pet.pet_age}</td>
                                    <td className="text-center">{pet.pet_location}</td>

                                    <td className="text-center">
                                        {pet.pet_status === 'adopted' ? <button
                                            // onClick={() => handleStatusChange(pet)}
                                            className="btn border-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500">
                                             Updated to Not Adopted
                                        </button> : <button
                                            // onClick={() => handleStatusChange(pet)}
                                            className="btn border-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500">
                                             Updated to Adopted
                                        </button>}
                                    </td>
                                    <td className="text-center">
                                    <Link>
                                    <button
                                            className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-red-600"></FaEdit>
                                        </button>
                                    </Link>
                                        <button
                                            // onClick={() => handleDeletePet(pet)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                      
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

export default AllPets;