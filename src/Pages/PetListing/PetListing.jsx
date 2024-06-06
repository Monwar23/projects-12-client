import { useState, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet";
import CardListing from "./CardListing";
import LoadingSpinner from "../../shared/LoadingSpinner";
import InfiniteScroll from 'react-infinite-scroll-component';

const PetListing = () => {
  const axiosCommon = useAxiosCommon();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosCommon.get('/petCategory');
      return res.data;
    },
  });

  const {
    data: petsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['pets', searchTerm, selectedCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('name', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      const res = await axiosCommon.get(`/pets?limit=10&offset=${pageParam}&${params.toString()}`);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        setHasMore(false); 
        return undefined; 
      }
      return allPages.reduce((acc, page) => acc + page.length, 0);
    }
  });

  useEffect(() => {
    setHasMore(true);
  }, [searchTerm, selectedCategory]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error: {error.message}</div>;

  const pets = petsData ? petsData.pages.flatMap(page => page) : [];

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
        <InfiniteScroll
          dataLength={pets.length}
          next={fetchNextPage}
          hasMore={hasMore && hasNextPage} 
          loader={<LoadingSpinner />}
          endMessage={<p>No more pets to load</p>}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {pets.map(pet => (
              <CardListing key={pet._id} item={pet} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PetListing;
