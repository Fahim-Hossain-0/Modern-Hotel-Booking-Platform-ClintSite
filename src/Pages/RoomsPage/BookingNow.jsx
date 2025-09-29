import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Context/AuthContext";

const BookingNow = ({ room }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [selectedDate, setSelectedDate] = useState(null);
  // local state copy of room
  const [localRoom, setLocalRoom] = useState(room);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { availability, name, pricePerNight, currency } = localRoom;

  const handleBooked = () => setIsModalOpen(true);

  const handleCancel = () => setIsModalOpen(false);

  const handleConfirmBooking = async () => {
    try {
      if (!availability) {
        Swal.fire({
          icon: "warning",
          title: "Room Not Available",
          text: "Sorry, this room is already booked!",
        });
        return;
      }

      await axios.patch(`http://localhost:5000/rooms/${room._id}`, {
        bookedBy: user.displayName,
        email: user?.email,
        availability: false,
        bookedDate: selectedDate,
      });

      // update local state
      setLocalRoom((prev) => ({ ...prev, availability: false }));

      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Booked!",
        text: `${name} has been booked successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "There was an issue booking the room. Please try again later.",
      });
    }
  };
  const handleBookedCancel = async () => {
    try {
      // Room must already be booked (availability === false) to cancel
      if (availability) {
        Swal.fire({
          icon: "warning",
          title: "Room Not Booked",
          text: "This room is already available, nothing to cancel!",
        });
        return;
      }

      await axios.patch(`http://localhost:5000/rooms/${room._id}`, {
        availability: true,
        bookedDate: null, // reset booked date
        bookedBy: null,
        email: null,
        // availability: false,
        // bookedDate: selectedDate,
      });

      // update local state
      setLocalRoom((prev) => ({
        ...prev,
        availability: true,
        bookedDate: null,
      }));

      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Booking Cancelled",
        text: `${name} booking has been cancelled successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Cancel booking failed:", error);
      Swal.fire({
        icon: "error",
        title: "Cancel Failed",
        text: "There was an issue cancelling the booking. Please try again later.",
      });
    }
  };

  return (
    <>
      {!availability && localRoom.bookedDate && (
        <p className="text-red-600 text-sm mt-2">
          Booked for: {new Date(localRoom.bookedDate).toLocaleDateString()}
        </p>
      )}

      {availability ? (
        <button onClick={handleBooked} className="btn btn-primary mt-4 w-full">
          Book Now
        </button>
      ) : (
        <button
          onClick={handleBookedCancel}
          className="btn btn-secondary mt-4 bg-red-950"
        >
          Not Available
        </button>
      )}

      {/* Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="mb-4">
              Price: {currency} {pricePerNight} per night
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleConfirmBooking} className="btn btn-primary">
                Book
              </button>
            </div>
          </div>
        </div>
      )} */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Select Booking Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()} // only today and future
                dateFormat="dd/MM/yyyy"
                className="border rounded px-2 py-1 w-full"
                placeholderText="Pick a date"
              />
            </div>

            {/* Room Info */}
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="mb-4">
              Price: {currency} {pricePerNight} per night
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="btn btn-primary"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingNow;
