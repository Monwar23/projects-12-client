import toast from 'react-hot-toast';
import useAxiosSecures from '../../hooks/useAxiosSecures';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const UpdatePetsAdmin = () => {

    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecures();

    const pets = useLoaderData();
    const navigate = useNavigate();

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosCommon.get('/petCategory');
            return res.data;
        }
    });

    const {
        _id,
        pet_image_url,
        pet_name, 
        pet_age, 
        pet_location, 
        pet_category,
        pet_short_description, 
        pet_long_description, 
        pet_status,
        email
    } = pets;

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const pet_name = form.pet_name.value;
        const pet_age = form.pet_age.value;
        const pet_location = form.pet_location.value;
        const pet_category = form.pet_category.value;
        const pet_short_description = form.pet_short_description.value;
        const pet_long_description = form.pet_long_description.value;
        const pet_status = form.pet_status.value;
        

        const formData = { 
            pet_image_url,
            pet_name, 
            pet_age, 
            pet_location, 
            pet_category: { value: pet_category, label: pet_category }, 
            pet_short_description, 
            pet_long_description, 
            pet_status,
            email
        };

        const petRes = await axiosSecure.put(`/allPets/${_id}`, formData);
        if (petRes.data.modifiedCount > 0) {
            navigate('/dashboard/allPets');
            toast.success(`${pet_name} has been updated in your Pet Collection.`);
        }
    };


    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">Update {pet_name}</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
            <div>
                <label className="block text-gray-700">Pet Name:</label>
                <input 
                    type="text" 
                    name="pet_name" 
                    defaultValue={pet_name} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required 
                />
            </div>
            <div>
                <label className="block text-gray-700">Pet Age:</label>
                <input 
                    type="number" 
                    name="pet_age" 
                    defaultValue={pet_age} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required 
                />
            </div>
            <div>
                <label className="block text-gray-700">Pet Location:</label>
                <input 
                    type="text" 
                    name="pet_location" 
                    defaultValue={pet_location} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required 
                />
            </div>
            <div>
                <label className="block text-gray-700">Pet Category:</label>
                <select 
                    name="pet_category" 
                    defaultValue={pet_category.value?pet_category.value:pet_category} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required
                >
                    {categories.map((category) => (
                        <option key={category.category} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-700">Short Description:</label>
                <textarea 
                    name="pet_short_description" 
                    defaultValue={pet_short_description} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required 
                />
            </div>
            <div>
                <label className="block text-gray-700">Long Description:</label>
                <textarea 
                    name="pet_long_description" 
                    defaultValue={pet_long_description} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required 
                />
            </div>
            <div>
                <label className="block text-gray-700">Pet Status:</label>
                <select 
                    name="pet_status" 
                    defaultValue={pet_status} 
                    className="w-full mt-2 p-2 border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    required
                >
                    <option value="adopted">Adopted</option>
                    <option value="not adopted">Not Adopted</option>
                </select>
            </div>
            <button 
                type="submit" 
                className="w-full btn btn-outline rounded-full border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none"
            >
                Update Pet
            </button>
        </form>
    </div>
    );
};

export default UpdatePetsAdmin;