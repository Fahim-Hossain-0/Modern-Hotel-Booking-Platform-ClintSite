import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import axios from "axios";
import Loading from "../../Components/Loading";
import MyBookingButton from "./MybookingButton";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyBookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
const axiosSecure =useAxiosSecure()
  useEffect(() => {
    axiosSecure
      .get(`/rooms/${id}`)
      .then((res) => {
        setBooking(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;

  if (!booking) return <p>No booking found</p>;

  return (
    <div className="p-8 mt-20 max-w-4xl mx-auto ">
      {/* Room Image */}
      <img
        src={booking.image}
        alt={booking.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Room Info */}
      <h1 className="text-2xl font-bold mt-4">{booking.name}</h1>
      <p className="text-gray-700 mt-2">{booking.description}</p>

      <p className="font-semibold mt-2">
        Price: {booking.pricePerNight} {booking.currency} / night
      </p>

      <p className="text-gray-700 mt-1">Type: {booking.type}</p>
      <p className="text-gray-700 mt-1">
        Booked Date: {booking.bookedDate || "Not selected"}
      </p>
      <p className="text-gray-700 mt-1">Booked By: {booking.bookedBy}</p>
      <p className="text-gray-700 mt-1">Email: {booking.email}</p>

      {/* Booking Action Button */}
      <div className="mt-4">
        <MyBookingButton booking={booking}></MyBookingButton>
      </div>

      {/* Reviews Section */}
      <h2 className="text-xl font-semibold mt-6">
        Reviews ({booking.reviews?.length || 0})
      </h2>

      <div className="mt-4 space-y-3">
        {booking.reviews?.length ? (
          booking.reviews.map((rev, index) => (
            <div key={index} className="border p-3 rounded">
              <p className="font-semibold">{rev.user}</p>
              <p className="font-medium flex gap-1  ">
                <FaStar style={{ fontSize: "20px", color: "yellow" }} />
                {rev.rating}
              </p>
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingDetails;
