import { useNavigate } from "react-router-dom";
import useAxiosSecures from "../../hooks/useAxiosSecures";
import UseAuth from "../../hooks/UseAuth";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilies";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";


const CreateDonationCampaign = () => {
    const axiosSecure = useAxiosSecures()
    const navigate = useNavigate()
    const { user } = UseAuth();
    const [lastDateOfDonation, setLastDateOfDonation] = useState(new Date());


    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const onSubmit = async data => {
        try {
            const image_url = await imageUpload(data.pet_image_url[0]);
            const petData = { ...data, pet_image_url: image_url };
    
            const petItem = {
                pet_image_url: petData.pet_image_url,
                pet_name: petData.pet_name,
                maximum_donation_amount: petData.maximum_donation_amount,
                last_date_of_donation: lastDateOfDonation,
                short_description: petData.short_description,
                long_description: petData.long_description,
                donated_amount: 0,
                email: petData.userEmail,
                time: new Date(),
                status:'unpaused'
            }
    
            const petRes = await axiosSecure.post('campaignsPet', petItem)
            if (petRes.data.insertedId) {
                reset()
                navigate('/dashboard/myDonationCampaigns')
                toast.success(`${data.pet_name} is added to the Donation Campaigns.`)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add A Donation Campaigns</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pet Image</label>
                    <input
                        type="file"
                        {...register('pet_image_url', { required: true })}
                        className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    {
                        errors.
                            pet_image_url && <span className="text-red-500 text-sm">This field is required</span>
                    }
                </div>
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
                    <label className="block text-sm font-medium text-gray-700">User Email</label>
                    <input
                        type="text"
                        {...register('userEmail', { required: true })}
                        value={user.email}
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

export default CreateDonationCampaign;