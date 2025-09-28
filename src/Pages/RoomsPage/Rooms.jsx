import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/rooms").then(res => setRooms(res.data));
    // //
    // fetch("http://localhost:5000/rooms")
    //   .then(res => res.json())
    //   .then(data => setRooms(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {rooms.map(room => (
        <div
          key={room.id}
          className="border rounded-lg shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(`/rooms/${room._id}`)}
        >
          <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h2 className="font-bold text-lg">{room.name}</h2>
            <p>{room.pricePerNight} {room.currency} / night</p>
            <p className="text-sm text-gray-500">
              {room.reviews?.length || 0} Reviews
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rooms;
