import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'
import banner5 from '../assets/banner5.jpg'
import banner6 from '../assets/banner6.jpg'
import { Link } from "react-router";


const BannerCarousel = () => {



  return (
    <div className="w-full mx-auto ">
      <Swiper
       style={{
    "--swiper-navigation-size": "25px", // smaller arrows
  }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[650px] flex items-center justify-center  text-white">
            <img
              src={banner1}
              alt="Slide 1"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold banner-font">Experience Luxury, Comfort & Elegance</h2>
              <p className="mt-2 text-lg font-medium opacity-50">Indulge in world-class amenities and personalized service.</p>

               <div className="mt-4">
              <button className="cursor-pointer bg-red-400 px-4 py-2 rounded-2xl"><Link to='/roomsPage'>See Rooms</Link></button>
            </div>
            </div>
           
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[650px] flex items-center justify-center  text-white">
            <img
              src={banner2}
              alt="Slide 2"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold banner-font">Your Perfect Stay Awaits</h2>
              <p className="mt-2 text-lg font-medium opacity-50">Relax in beautifully designed rooms made just for you.</p>
                             <div className="mt-4">
              <button className="cursor-pointer bg-red-400 px-4 py-2 rounded-2xl"><Link to='/roomsPage'>See Rooms</Link></button>
            </div>

            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[650px] flex items-center justify-center  text-white">
            <img
              src={banner3}
              alt="Slide 3"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold banner-font">Unwind in Style, Stay with Us</h2>
              <p className="mt-2 text-lg font-medium opacity-50">From cozy suites to fine dining — everything at your fingertips.</p>
                             <div className="mt-4">
              <button className="cursor-pointer bg-red-400 px-4 py-2 rounded-2xl"><Link to='/roomsPage'>See Rooms</Link></button>
            </div>

            </div>
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative h-[650px] flex items-center justify-center  text-white">
            <img
              src={banner4}
              alt="Slide 3"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold banner-font">Discover Hospitality Like Never Before</h2>
              <p className="mt-2 text-lg font-medium opacity-50">A warm welcome, premium comfort, and unforgettable memories.</p>

                             <div className="mt-4">
              <button className="cursor-pointer bg-red-400 px-4 py-2 rounded-2xl"><Link to='/roomsPage'>See Rooms</Link></button>
            </div>

            </div>
          </div>
        </SwiperSlide>
        {/* Slide 5 */}
        <SwiperSlide>
          <div className="relative h-[650px] flex items-center justify-center  text-white">
            <img
              src={banner5}
              alt="Slide 3"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold banner-font">Where Comfort Meets Affordability</h2>
              <p className="mt-2 text-lg font-medium opacity-50">Enjoy a premium experience at a price you’ll love.</p>
                             <div className="mt-4">
              <button className="cursor-pointer bg-red-400 px-4 py-2 rounded-2xl"><Link to='/roomsPage'>See Rooms</Link></button>
            </div>

            </div>
          </div>
        </SwiperSlide>
        {/* Slide 6 */}
        <SwiperSlide>
          <div className="relative h-[650px] flex items-center justify-center  text-white">
            <img
              src={banner6}
              alt="Slide 3"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute bg-black/50 inset-0 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold banner-font">Book Your Dream Stay Today</h2>
              <p className="mt-2 text-lg font-medium opacity-50">Seamless booking, luxury stays, and lasting experiences.</p>
                             <div className="mt-4">
              <button className="cursor-pointer bg-red-400 px-4 py-2 rounded-2xl"><Link to='/roomsPage'>See Rooms</Link></button>
            </div>

            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
