import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";

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
    <div className="p-6">
      {/* Filter + Sort */}
      <form onSubmit={handleFilter} className="flex items-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/rooms/${room._id}`)}
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg">{room.name}</h2>
              <p>
                {room.pricePerNight} {room.currency} / night
              </p>
              <p className="text-gray-500 text-sm">
                {room.reviews?.length || 0} Reviews
              </p>
              <p className="text-red-500 font-medium">
                {room.availability ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Rooms;
