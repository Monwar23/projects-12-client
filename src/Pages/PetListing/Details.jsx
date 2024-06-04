
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import DetailsModal from "./DetailsModal";
import UseAuth from "../../hooks/UseAuth";

const Details = () => {
    const pet = useLoaderData();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { user } = UseAuth()
    const navigate = useNavigate();

    const handleAdoptButtonClick = () => {
        if (user) {
            setIsEditModalOpen(true);
        } else {
            navigate('/login');
        }
    };

    const {
        pet_image_url,
        pet_name,
        pet_age,
        pet_location,
        pet_short_description,
        pet_long_description,
    } = pet;

    return (
        <div className="min-h-screen mt-10 mb-5 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>LovingPets | Details</title>
            </Helmet>
            <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            className="h-64 w-full object-cover md:h-full md:w-96"
                            src={pet_image_url}
                            alt={pet_name}
                        />
                    </div>
                    <div className="p-8 md:w-2/3">
                        <div className="uppercase tracking-wide text-sm text-pink-500 font-bold">
                            {pet_name}
                        </div>
                        <h1 className="mt-1 text-2xl leading-tight font-extrabold text-gray-900">
                            {pet_age} years old
                        </h1>
                        <div className="flex items-center mt-2 text-gray-600">
                            <FaMapMarkerAlt className="text-pink-500" />
                            <span className="ml-1">{pet_location}</span>
                        </div>
                        <p className="mt-4 text-gray-700">{pet_short_description}</p>
                        <hr className="my-6" />
                        <p className="mt-4 text-gray-700">{pet_long_description}</p>
                        <div className="mt-5">
                            <button onClick={handleAdoptButtonClick}
                                className="btn btn-outline rounded-full border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none">
                                Adopt {pet_name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DetailsModal
                isOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                pet={pet}
                user={user}
            ></DetailsModal>
        </div>
    );
};

export default Details;
