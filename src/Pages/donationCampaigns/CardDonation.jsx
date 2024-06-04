import { Link } from "react-router-dom";

const CardDonation = ({ item }) => {
  const { _id, pet_image_url, pet_name, maximum_donation_amount, donated_amount } = item;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 p-4 bg-white">
      <img className="w-full rounded-xl h-48 object-cover" src={pet_image_url} alt={`${pet_name}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-center text-pink-500 text-xl mb-2">{pet_name}</div>
        <p className="text-gray-700 text-center text-base">
          Maximum Donation Amount : <span className="text-pink-500">${maximum_donation_amount}</span>
        </p>
        <p className="text-gray-700 text-center text-base">
          Donated Amount : <span className="text-pink-500">${donated_amount}</span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Donation
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{pet_name}
        </span>
      </div>
      <Link to={`/details/${_id}`} className="flex justify-center my-4
      ">
        <button
         className="btn btn-outline border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none mr-3 px-6">View Details</button>
      </Link>
     
    </div>
  );
};

export default CardDonation;
