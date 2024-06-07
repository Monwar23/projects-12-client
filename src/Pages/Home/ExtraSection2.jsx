import SectionTitle from "../../components/SectionTitle";
import Marquee from "react-fast-marquee";
const ExtraSection2 = () => {
    return (
        <div>
             <SectionTitle
            heading={"Our Story featured in..."}
            subHeading={"We're proud to be featured in various media outlets, highlighting our mission to find loving homes for pets. Explore the stories below to see our impact and the journeys of the wonderful animals we help."}
            >
            </SectionTitle>

            <div>
               <Marquee pauseOnHover={true} speed={100}>
               <div className="mr-10">
               <img src="https://i.ibb.co/GQs8cx5/611fdfe77fbd575747c9fe23-National-Geographic-Logo.png" alt="" />
               </div>
               <div className="mr-10">
               <img src="https://i.ibb.co/hs0ym61/611fe00d0785299f50aa97c0-prime-video.png" alt="" />
               </div>
              <div className="mr-10">
              <img src="https://i.ibb.co/2y87RGV/611fe07ff9da0ec5316be18d-Netflix.png" alt="" />
              </div>
                <div className="mr-10">
                <img src="https://i.ibb.co/YZktm5g/611fe064fdfc5c7d3be1873a-Atlas-Obscura-logo.png" alt="" />
                </div>
                <div className="mr-10">
                <img src="https://i.ibb.co/q9TzXwg/611fe049f1d0d327323fc35e-bbc-news-linear-world-service.png" alt="" />
                <img src="https://i.ibb.co/nzV38d7/611fe02a70c1fb65b365b377-Vice-Logo.png" alt="" />
                </div>
               </Marquee>

            </div>

        </div>
    );
};

export default ExtraSection2;