import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Inspired from "./Inspired";
import PetCategory from "./PetCategory";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetCategory></PetCategory>
            <Inspired></Inspired>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;