import React, { useState, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet";
import CardDonation from "./CardDonation";
import LoadingSpinner from "../../shared/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const DonationCampaigns = () => {
  const axiosCommon = useAxiosCommon();
  const [hasMore, setHasMore] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const {
    data: campaignsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["campaigns"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axiosCommon.get(`/campaignsPet?page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        setHasMore(false);
        return undefined;
      }
      return allPages.length;
    },
  });

  useEffect(() => {
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (campaignsData) {
      const newCampaigns = campaignsData.pages.flatMap((page) => page);
      setCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns]);
    }
  }, [campaignsData]);

  if (isLoading && campaigns.length === 0) return <LoadingSpinner />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Helmet>
        <title>LovingPets | DonationCampaigns</title>
      </Helmet>
      <div className="">
        <InfiniteScroll
          dataLength={campaigns.length}
          next={fetchNextPage}
          hasMore={hasMore && hasNextPage}
          loader={<LoadingSpinner />}
          endMessage={<p>No more campaigns to load</p>}
          scrollThreshold={0.9} // Trigger the next fetch when the user scrolls to 90% of the page
        >
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
         {campaigns.map((item) => (
            <CardDonation key={item._id} item={item}></CardDonation>
          ))}
         </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default DonationCampaigns;
