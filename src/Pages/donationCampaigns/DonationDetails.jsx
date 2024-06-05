import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import UseAuth from '../../hooks/UseAuth';
import DonationModal from './DonationModal';
import { Helmet } from 'react-helmet';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../shared/LoadingSpinner';
import CardDonation from './CardDonation';
import SectionTitle from '../../components/SectionTitle';

const DonationDetails = () => {

    const pet = useLoaderData();
    const { user } = UseAuth()
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const axiosCommon = useAxiosCommon()

    const {
        data: campaignsPet = [],
        isLoading,
    } = useQuery({
        queryKey: ['campaignsPet'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/campaignsPet`)
            return data
        },
    })

    const handleDonationButtonClick = () => {
        if (user) {
            setIsEditModalOpen(true);
        } else {
            navigate('/login');
        }
    };

    const {
        pet_image_url,
        pet_name,
        maximum_donation_amount,
        last_date_of_donation,
        short_description,
        long_description,
        donated_amount
        
    } = pet;

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
     <div>
         <Helmet>
            <title>LovingPets | Donation Details</title>
        </Helmet>
           <div className="min-h-screen mt-10 mb-5 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4 sm:px-6 lg:px-8">
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
                    <p className="mt-4 text-gray-700">{short_description}</p>
                    <h2>Maximum Donation Amount : <span className='font-bold text-pink-500'>${maximum_donation_amount}</span></h2>
                    <h2>Donated Amount : <span className='font-bold text-pink-500'>${donated_amount}</span></h2>
                    <h2>Last Date of Donation : <span className='font-bold text-pink-500'>{last_date_of_donation}</span></h2>
                    <hr className="my-6" />
                    <p className="mt-4 text-gray-700">{long_description}</p>
                    <div className="mt-5">
                        <button onClick={handleDonationButtonClick}
                            className="btn btn-outline rounded-full border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none">
                            Donation {pet_name}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <DonationModal
            isOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            pet={pet}
            user={user}
        ></DonationModal>
    </div>
    <SectionTitle
                heading={"Extend Your Support: Discover Ongoing Causes"}
                subHeading={"Join forces with our ongoing donation campaigns. These vital initiatives are actively addressing urgent needs and creating positive change. Explore the campaigns below and contribute to the cause that speaks to you most."}
            ></SectionTitle>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
    {campaignsPet.slice(0, 3).map(item => (
      <CardDonation key={item._id} item={item} ></CardDonation>
    ))}
  </div>
     </div>
    );
};

export default DonationDetails;