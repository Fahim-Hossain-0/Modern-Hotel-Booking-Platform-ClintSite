import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loading from "../../Components/Loading";
import MyBookingButton from "./MybookingButton";
import RoomReviews from "./RoomReviews";

const MyBookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/rooms/${id}`)
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
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">{booking.name}</h1>
      <p className="text-gray-700">Type: {booking.type}</p>
      <p className="text-gray-700">Price: ${booking.pricePerNight}</p>
      <p className="text-gray-700">Booked Date: {booking.bookedDate}</p>
      <p className="text-gray-700">Booked By: {booking.bookedBy}</p>
      <p className="text-gray-700">Email: {booking.email}</p>
      <MyBookingButton booking={booking}></MyBookingButton>

      {/* <div className="mt-4 space-y-3">
        {booking.reviews?.map((rev, index) => (
          <div key={index} className="border p-3 rounded">
            <p className="font-semibold">{rev.user} ⭐ {rev.rating}</p>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div> */}
      <RoomReviews booking={booking}></RoomReviews>
    </div>
  );
};

export default MyBookingDetails;
