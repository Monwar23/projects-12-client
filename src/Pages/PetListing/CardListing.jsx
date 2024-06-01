import { Link } from "react-router-dom";

const CardListing = ({ item }) => {
  const {_id, pet_image_url, pet_name, pet_age, pet_location, pet_short_description } = item;
  

 
  return (
    <div className=" rounded-md overflow-hidden shadow-lg bg-white mb-4 hover:scale-105 transition">
      <img className="w-full h-56 object-cover" src={pet_image_url} alt={pet_name} />
      <div className="px-6 py-4">
        <div className="font-bold text-center text-pink-500 text-xl mb-2">{pet_name}</div>
        <p className="text-gray-700 text-center text-base">{pet_short_description}</p>
      </div>
      <div className="px-6 py-4 flex justify-center">
        <span className="inline-block bg-pink-200 rounded-2xl  px-3 py-2 text-sm font-semibold text-gray-700 mr-2">Age : 0{pet_age}</span>
        <span className="inline-block bg-pink-200 rounded-2xl px-3 py-2 text-sm font-semibold text-gray-700">Location : {pet_location}</span>
      </div>
      <Link to={`/details/${_id}`} className="flex justify-center mb-4
      ">
        <button
         className="btn btn-outline border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none mr-3 px-6">View Details</button>
      </Link>
     

    </div>
  );
};

export default CardListing;
