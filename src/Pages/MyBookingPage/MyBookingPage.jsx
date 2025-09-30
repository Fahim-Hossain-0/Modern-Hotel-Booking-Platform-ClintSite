import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../Components/Loading';
import { useNavigate } from 'react-router';

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
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myBookings.length > 0 ? (
        myBookings.map((booking) => (
          <div
            key={booking._id}
            onClick={() => navigate(`/my-booking/${booking._id}`)}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-5 border hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{booking.id}</h2>
            <h2 className="text-xl font-semibold mb-2">{booking.name}</h2>
            <p className="text-gray-600">Type: {booking.type}</p>
            <p className="text-gray-600">Price: ${booking.pricePerNight}</p>
            <p className="text-gray-600">Booked Date: {booking.bookedDate}</p>
            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded">
              View Details
            </span>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">No booked rooms found</p>
      )}
    </div>
  );
};

export default MyBookingPage;
