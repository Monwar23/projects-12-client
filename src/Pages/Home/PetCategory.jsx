import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../shared/LoadingSpinner";
import CardCategory from "./CardCategory";
import SectionTitle from "../../components/SectionTitle";

const PetCategory = () => {

    const axiosCommon=useAxiosCommon()

    const {data: category=[], isLoading}=useQuery({
        queryKey:['category'],
        queryFn:async()=>{
            const res=await axiosCommon.get('/petCategory')
            return res.data
        }
    })
    // console.log(category);

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        
        <div>
            <SectionTitle
             heading={"Adopt a Friend"}
             subHeading={"Every pet deserves a loving home. Check out our categories and find the perfect companion for your family."}
            ></SectionTitle>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 ">
            {
                category.map(item=><CardCategory key={item._key} item={item}></CardCategory>)
            }
        </div>
        </div>
    );
};

export default PetCategory;