import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../Components/Loading';

const MyBookingPage = () => {
  const { user } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {

      axios.get(`http://localhost:5000/my-booking?email=${user.email}`)
        .then((res) => {
          setMyBookings(res.data); // Only booked rooms
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
    <div>
      <h1>My Booking Page</h1>
      {myBookings.length > 0 ? (
        myBookings.map((booking) => (
          <div key={booking._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h1>{booking.id}</h1>
            <h2>{booking.name}</h2>
            <p>Type: {booking.type}</p>
            <p>Price: {booking.pricePerNight}</p>
            {/* <p>Status: Booked</p> */}
            <p>Booked Date: {booking.bookedDate}</p>
            <p>{booking.bookedBy}</p>
            <p>{booking.email}</p>
          </div>
        ))
      ) : (
        <p>No booked rooms found</p>
      )}
    </div>
  );
};

export default MyBookingPage;
