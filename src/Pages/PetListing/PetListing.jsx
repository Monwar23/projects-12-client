import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet";
import CardListing from "./CardListing";
import LoadingSpinner from "../../shared/LoadingSpinner";

const PetListing = () => {
  const axiosCommon = useAxiosCommon()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets', searchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchTerm) params.append('name', searchTerm)
      if (selectedCategory) params.append('category', selectedCategory)
      const res = await axiosCommon.get(`/pets?${params.toString()}`)
      return res.data
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosCommon.get('/petCategory')
      return res.data
    }
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Helmet>
        <title>LovingPets | PetListing</title>
      </Helmet>
      <div className="mt-10 mb-5">
        <div className="flex justify-center mb-5 gap-5">
          <input 
            type="text" 
            placeholder="Search by pet name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-pink-500 rounded focus:outline-pink-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-pink-500 rounded focus:outline-pink-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category.category}>{category.category}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {pets.map(item => (
            <CardListing key={item._id} item={item}></CardListing>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetListing;
