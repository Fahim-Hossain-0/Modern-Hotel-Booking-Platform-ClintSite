import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import { FaStar } from "react-icons/fa";
const TopRoom = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/rooms/top-rated?limit=5`)
      .then((res) => {
        setTopRated(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-5xl text-center pb-12 font-bold">
        Top 5 Rated Rooms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {topRated.slice(0, 3).map((room) => (
          <div
            key={room._id}
            className="card card-compact w-full bg-base-100 shadow-xl hover:shadow-2xl transition cursor-pointer p-4"
            onClick={() => navigate(`/rooms/${room._id}`)} // navigate to details page
          >
            <figure>
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{room.name}</h2>
              <p className="text-[#1E293B] font-semibold text-base">
                Price: {room.pricePerNight} {room.currency} / night
              </p>
              <p className="text-gray-600 font-medium">
                Reviews: {room.reviews?.length || 0}
              </p>
              <p className="flex items-center text-base text-yellow-500 font-semibold gap-1">
               <FaStar style={{ fontSize: "20px" }}  />
        
                {room.averageRating
                  ? room.averageRating.toFixed(1)
                  : "No rating"}
              </p>
              <p
                className={`font-medium ${
                  room.availability ? "border-1 rounded-full p-1 w-[25%] text-center text-green-600" : "text-red-600 border-1 rounded-full p-1 w-[30%] text-center"
                }`}
              >
                {room.availability ? "Available" : "Not Available"}
              </p>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn rounded bg-[#174fa8] border hover:bg-transparent hover:border-[#588adb] hover:text-[#174fa8] text-white w-full"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    navigate(`/rooms/${room._id}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRoom;
