import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet";

const PetListing = () => {

    const axiosCommon=useAxiosCommon()

    const {data: pets=[], isLoading}=useQuery({
        queryKey:['pets'],
        queryFn:async()=>{
            const res=await axiosCommon.get('/pets')
            return res.data
        }
    })

    return (
        <div>
            <Helmet>
            <title>LovingPets | PetListing</title>
            </Helmet>
            <div>
             {
                category.map(item=><CardCategory key={item._key} item={item}></CardCategory>)
            }
        </div>
        </div>
    );
};

export default PetListing;