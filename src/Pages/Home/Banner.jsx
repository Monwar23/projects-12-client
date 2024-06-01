import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Slide from './Slide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='container roun py-10 mx-auto'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >

          <SwiperSlide>
            <Slide
              image="https://i.ibb.co/kGCmzvG/pexels-bertellifotografia-16652392.jpg"
              title="Meet Our Adoptable Pets"
              text='Discover dogs, cats, and other pets ready for adoption. Each one has a unique story and is waiting for a forever family.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://i.ibb.co/VqjYX2q/pexels-mikhail-nilov-7474345.jpg"
              title="Success Stories"
              text='See heartwarming stories of pets who found their forever homes through our website. Be inspired and join our community of happy adopters.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://i.ibb.co/ZdpbXpb/pexels-free-bot-471594562-20393596.jpg"
              title="Pet Care Tips"
              text='Get expert advice on pet care, training, and health. We’re here to help you provide the best care for your furry friends.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://i.ibb.co/kDwJySP/pexels-mikhail-nilov-7474567.jpg"
              title="Volunteer and Donate"
              text='Support our mission by volunteering or making a donation. Every little bit helps us care for more animals and find them loving homes.'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image="https://i.ibb.co/K7GHrqy/pexels-marina-zvada-844583049-20368062.jpg"
              title=" Foster a Pet"
              text='Provide temporary homes for pets in need. Find out how fostering works and how you can make a big impact with a little time and love.'
            />
          </SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Banner;