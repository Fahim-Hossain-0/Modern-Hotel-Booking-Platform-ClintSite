import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../Components/Loading';

const TopRoom = () => {
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/rooms/top-rated?limit=5`)
            .then(res => {
                setTopRated(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <h1 className='text-5xl text-center pb-12 font-bold'>Top 5 Rated Rooms</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topRated.slice(0,3).map((room) => (
                    <div
                        key={room._id}
                        className="card card-compact w-full bg-base-100 shadow-xl hover:shadow-2xl transition cursor-pointer"
                        onClick={() => navigate(`/rooms/${room._id}`)} // navigate to details page
                    >
                        <figure>
                            <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-t-lg"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{room.name}</h2>
                            <p className="text-gray-500">Price: {room.pricePerNight} {room.currency} / night</p>
                            <p className="text-gray-500">Reviews: {room.reviews?.length || 0}</p>
                            <p className="text-yellow-500 font-semibold">
                                ⭐ {room.averageRating ? room.averageRating.toFixed(1) : 'No rating'}
                            </p>
                            <p className={`font-medium ${room.availability ? 'text-green-600' : 'text-red-600'}`}>
                                {room.availability ? 'Available' : 'Not Available'}
                            </p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary w-full"
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
