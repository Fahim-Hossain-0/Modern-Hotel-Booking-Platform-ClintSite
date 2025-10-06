import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router";
import { FaStar } from "react-icons/fa6";

const MyBookingPage = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-booking?email=${user.email}`)
        .then((res) => {
          setMyBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      {myBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myBookings.map((booking) => (
            <div
              key={booking._id}
              className="card card-compact w-full bg-base-100 shadow-xl hover:shadow-2xl transition cursor-pointer p-4"
              onClick={() => navigate(`/my-booking/${booking._id}`)}
            >
              <figure>
                <img
                  src={booking.image}
                  alt={booking.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-2xl">{booking.name}</h2>

                <p className="text-[#1E293B] font-semibold text-base">
                  Price: {booking.pricePerNight} {booking.currency} / night
                </p>

                <p className="text-gray-600 font-medium">
                  Booked Date: {booking.bookedDate || "N/A"}
                </p>

                <p className="flex items-center text-base text-yellow-500 font-semibold gap-1">
                  <FaStar style={{ fontSize: "20px" }} />
                  {booking.averageRating
                    ? booking.averageRating.toFixed(1)
                    : "No rating"}
                </p>

                {/* <p
                  className={`font-medium ${
                    booking.availability
                      ? "border rounded-full p-1 w-[25%] text-center text-green-600"
                      : "border rounded-full p-1 w-[30%] text-center text-red-600"
                  }`}
                >
                  {booking.availability ? "Available" : "Not Available"}
                </p> */}

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn rounded bg-[#174fa8] border hover:bg-transparent hover:border-[#588adb] hover:text-[#174fa8] text-white w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/my-booking/${booking._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="col-span-3 text-center text-gray-500">
          No booked rooms found
        </p>
      )}
    </div>
  );
};

export default MyBookingPage;
