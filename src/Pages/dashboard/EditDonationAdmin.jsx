import { useForm } from "react-hook-form";
import { useNavigate, useLoaderData } from "react-router-dom";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import DatePicker from "react-datepicker";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import "react-datepicker/dist/react-datepicker.css";

const EditDonationAdmin = () => {
    const donation = useLoaderData();
    const axiosSecure = useAxiosSecures();
    const navigate = useNavigate();

    const {
        _id,
        pet_name,
        pet_image_url,
        maximum_donation_amount,
        last_date_of_donation,
        short_description,
        long_description,
        status,
        email
    } = donation;

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            pet_name,
            maximum_donation_amount,
            short_description,
            long_description,
            status,
            userEmail: email
        }
    });

    const [lastDateOfDonation, setLastDateOfDonation] = useState(new Date(last_date_of_donation));

    const onSubmit = async data => {
        try {
            const petItem = {
                pet_name: data.pet_name,
                pet_image_url:pet_image_url,
                maximum_donation_amount: data.maximum_donation_amount,
                last_date_of_donation: lastDateOfDonation,
                short_description: data.short_description,
                long_description: data.long_description,
                donated_amount: donation.donated_amount,
                email: data.userEmail,
                time: new Date(),
                status: data.status
            }

            const petRes = await axiosSecure.put(`campaignsPet/${_id}`, petItem);
            if (petRes.data.modifiedCount > 0) {
                navigate('/dashboard/allDonation');
                toast.success(`${data.pet_name} has been updated.`);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <Helmet>
                <title>LovingPets | Edit Donation Admin</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Donation Campaign</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        {...register('pet_name', { required: true })}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    {errors.pet_name && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Maximum Donation Amount</label>
                    <input
                        type="text"
                        {...register('maximum_donation_amount', { required: true })}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    {errors.maximum_donation_amount && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Date Of Donation</label>
                    <DatePicker
                        selected={lastDateOfDonation}
                        onChange={(date) => setLastDateOfDonation(date)}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    {errors.last_date_of_donation && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        {...register('short_description', { required: true })}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    {errors.short_description && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Long Description</label>
                    <textarea
                        {...register('long_description', { required: true })}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    {errors.long_description && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        {...register('status', { required: true })}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    >
                        <option value="paused">Paused</option>
                        <option value="unpaused">Unpaused</option>
                    </select>
                    {errors.status && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">User Email</label>
                    <input
                        type="text"
                        {...register('userEmail', { required: true })}
                        value={email}
                        readOnly
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 bg-gray-200 cursor-not-allowed"
                    />
                    {errors.userEmail && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="text-center">
                    <button type="submit" className="w-full btn btn-outline rounded-full border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditDonationAdmin;
