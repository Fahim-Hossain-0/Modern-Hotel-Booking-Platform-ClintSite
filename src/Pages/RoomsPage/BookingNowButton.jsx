import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Context/AuthContext";

const BookingNowButton = ({ room }) => {
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
          // 1️⃣ Validate date
          if (!selectedDate) {
              Swal.fire({
                  icon: "warning",
                  title: "No Date Selected",
                  text: "Please select a booking date before confirming!",
              });
              return;
          }

          // 2️⃣ Check availability
          if (!availability) {
              Swal.fire({
                  icon: "warning",
                  title: "Room Not Available",
                  text: "Sorry, this room is already booked!",
              });
              return;
          }

          // 3️⃣ Proceed with booking
          await axios.patch(`http://localhost:5000/rooms/${room._id}`, {
              bookedBy: user.displayName,
              email: user?.email,
              availability: false,
              bookedDate: selectedDate,
          });

          // 4️⃣ Update local state
          setLocalRoom((prev) => ({
              ...prev,
              availability: false,
              bookedDate: selectedDate,
          }));

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


  return (
      <>
          {!availability && localRoom.bookedDate && (
              <p className="text-red-600 text-sm mt-2">
                  Booked for:{" "}
                  {new Date(localRoom.bookedDate).toLocaleDateString()}
              </p>
          )}

          {availability ? (
              <button
                  onClick={handleBooked}
                  className="btn bg-[#003366] border hover:border-[#003366] hover:bg-transparent hover:text-[#003366] text-white mt-4 w-full"
              >
                  Book Now
              </button>
          ) : (
              <button className="btn btn-secondary mt-4 bg-red-950">
                  Not Available
              </button>
          )}

          {/* Modal */}

          {isModalOpen && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-[3px] flex justify-center items-center z-50">

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
                          <button
                              onClick={handleCancel}
                              className="btn btn-secondary"
                          >
                              Cancel
                          </button>
                          <button
                              onClick={handleConfirmBooking}
                              className="btn btn-primary"
                              disabled={!selectedDate}
                              
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

export default BookingNowButton;
