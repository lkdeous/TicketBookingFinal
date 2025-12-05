import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookTickets() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBooking = JSON.parse(localStorage.getItem("selectedSeats"));
    if (!savedBooking) {
      navigate("/"); // если нет брони, редирект на главную
      return;
    }
    setBooking(savedBooking);
  }, [navigate]);

  if (!booking) return null;

  return (
    <div>
      <h2>Booking Confirmation</h2>
      <p>Movie: {booking.movie.title}</p>
      <p>
        Date: {booking.movie.date} | Time: {booking.movie.time}
      </p>
      <p>Seats: {booking.seats.join(", ")}</p>
      <p className="text-success">Your booking has been saved!</p>
    </div>
  );
}

export default BookTickets;
