import SectionTitle from "../../components/SectionTitle";
import './about.css'

const AboutUs = () => {
    return (
        <div className="about-item bg-fixed text-white pt-8">
             <SectionTitle
                heading={"About Us"}
                subHeading={"Welcome to LovingPets! We're thrilled to have you here. If you're passionate about finding a loving companion or helping animals in need, you're in the right place."}
            ></SectionTitle>
            <div>
                <div>
                <h2 className="text-center text-3xl uppercase ">Our mission</h2>
                <p className="text-center lg:px-16">At LovingPets, our mission is simple: to connect loving families with their perfect furry companions. Every pet deserves a forever home, and we are dedicated to making that possible by simplifying the adoption process and facilitating meaningful connections between adopters and shelters.</p>
                </div>
                <div className="mt-5">
                <h2 className="text-center text-3xl uppercase ">Our Story</h2>
                <p className="text-center lg:px-16 textb">Founded out of a shared passion for animals, LovingPets was created to make a positive impact in the world of pet adoption. We understand the joy of rescuing a furry friend and aim to streamline the adoption process for both adopters and shelters.</p>
                </div>
                <div className="mt-5 pb-10">
                <h2 className="text-center text-3xl uppercase ">Meet Our Team</h2>
                <p className="text-center lg:px-16">Meet the dedicated individuals behind LovingPets! Our team consists of passionate animal lovers with diverse backgrounds in technology, marketing, and animal welfare. Together, we are committed to making a difference in the lives of pets and their adoptive families.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;