import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingNowButton from "./BookingNowButton";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

function RoomDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure()
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/rooms/${id}`).then(res => setRoom(res.data));
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (

    <div className="max-w-4xl mx-auto p-8 mt-20">
      {/* <h1>{id}</h1> */}
      <img src={room.image} alt={room.name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{room.name}</h1>
      <p>{room.description}</p>
      <p className="font-semibold mt-2">
        Price: {room.pricePerNight} {room.currency} / night
      </p>
        <div>
            <BookingNowButton room={room}></BookingNowButton>
        </div>
      <h2 className="text-xl font-semibold mt-6">Reviews ({room.reviews?.length || 0})</h2>
      <div className="mt-4 space-y-3">
        {room.reviews?.map((rev, index) => (
          <div key={index} className="border p-3 rounded">
            <p className="font-semibold">
              {rev.user} 
              </p>
              <p className="font-medium flex gap-1"> <FaStar style={{ fontSize: "20px" , color:"yellow" }}  /> {rev.rating}</p>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomDetails;
