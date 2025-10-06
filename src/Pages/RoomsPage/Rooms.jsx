import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import { FaStar } from "react-icons/fa";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms(page);
  }, [page]);

  const fetchRooms = async (page, filter = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.minPrice) params.append("minPrice", filter.minPrice);
      if (filter.maxPrice) params.append("maxPrice", filter.maxPrice);
      if (filter.sortOrder) params.append("sortOrder", filter.sortOrder);

      params.append("limit", 6);
      params.append("page", page);

      const url = `http://localhost:5000/rooms?${params.toString()}`;
      const res = await axios.get(url);

      // If it's page 1, reset data. If load more, append.
      if (page === 1) {
        setRooms(res.data.data);
      } else {
        setRooms((prev) => [...prev, ...res.data.data]);
      }

      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
    setLoading(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page when filter applied
    fetchRooms(1, { minPrice, maxPrice, sortOrder });
  };

  if (loading && page === 1) return <Loading />;

  return (
    <div className="w-[95%] mx-auto mt-6">
      {/* Filter + Sort */}
      <form onSubmit={handleFilter} className="flex items-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border focus:outline-none rounded px-3 py-1"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border focus:outline-none rounded px-3 py-1"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option className="" value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>

      <div>
        <h1 className="text-6xl font-semibold heading-font text-center my-12"> HERE ALL ROOM</h1>
      </div>

      {/* Rooms Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
  <div
    key={room._id}
    className="card card-compact w-full bg-base-100 shadow-xl hover:shadow-2xl transition cursor-pointer p-4"
    onClick={() => navigate(`/rooms/${room._id}`)}
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
        <FaStar style={{ fontSize: "20px" }} />
        {room.averageRating ? room.averageRating.toFixed(1) : <FaStar style={{ fontSize: "20px" }} />
        }

      </p>

      <p
        className={`font-medium ${
          room.availability
            ? "border rounded-full p-1 w-[25%] text-center text-green-600"
            : "border rounded-full p-1 w-[30%] text-center text-red-600"
        }`}
      >
        {room.availability ? "Available" : "Not Available"}
      </p>

      <div className="card-actions justify-end mt-4">
        <button
          className="btn rounded bg-[#174fa8] border hover:bg-transparent hover:border-[#588adb] hover:text-[#174fa8] text-white w-full"
          onClick={(e) => {
            e.stopPropagation();
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

      {/* Load More Button */}
      {page < totalPages && (
        <div className="flex justify-center my-14">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="flex items-center gap-2 bg-blue-300 w-[15%] text-center justify-center py-2 font-semibold text-gray-700 rounded hover:text-white hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Rooms;
