import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecures()



    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users`)
            return data
        },
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F472B6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Admin this user!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: `${user.name} is Now Admin`,
                                icon: "success"
                            });
                        }
                    })
            }
        })
    }

           
            if (isLoading) return <LoadingSpinner />

            return (
                <div>
                    <Helmet>
                        <title>LovingPets | All Users</title>
                    </Helmet>
                    <div>
                        <div className="flex justify-evenly my-4">
                            <h2 className="text-3xl text-center mb-5">Total Users: {users.length}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Role</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => <tr key={user._id}>
                                            <th className="text-center">{index + 1}</th>
                                            <td className="text-center">{user.name}</td>
                                            <td className="text-center">{user.email}</td>
                                            <td className="flex justify-center"><img className="rounded-full" src={user.photo} alt="" /></td>
                                            <td className="text-center">
                                                {user.role === 'admin' ? 'Admin' : <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn border-2 border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500">
                                                    Make Admin
                                                </button>}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    // onClick={() => handleDeleteUser(user)}
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

        export default ManageUsers;