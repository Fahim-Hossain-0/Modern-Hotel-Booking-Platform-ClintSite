// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Reviews = () => {
  const axiosSecure = useAxiosSecure()
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get('/reviews')
      .then(res => {
        setReviews(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Guests Say</h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="card bg-base-100 shadow-xl p-6 h-full flex flex-col justify-between mt-12">
              <div>
                <h2 className="card-title mb-2">{review.user || "Anonymous"}</h2>
                <Rating style={{ maxWidth: 120 }} value={review.rating} readOnly />
                <p className="text-gray-600 mt-3">{review.comment}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
``
export default Reviews;
