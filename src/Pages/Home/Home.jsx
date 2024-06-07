import { Helmet } from "react-helmet";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Inspired from "./Inspired";
import PetCategory from "./PetCategory";
import ExtraSection1 from "./ExtraSection1";
import ExtraSection2 from "./ExtraSection2";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>LovingPets | Home</title>
            </Helmet>
            <Banner></Banner>
            <PetCategory></PetCategory>
            <Inspired></Inspired>
            <AboutUs></AboutUs>
            <ExtraSection1></ExtraSection1>
            <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;