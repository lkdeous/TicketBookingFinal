import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectSeats() {
  const navigate = useNavigate();
  const storedMovie = localStorage.getItem("selectedMovie");
  const movie = storedMovie ? JSON.parse(storedMovie) : null;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
      return;
    }

    if (!movie) {
      navigate("/browse-movies");
      return;
    }

    // Берём все брони для этого фильма
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const bookedForMovie = bookings[movie.id] || {};

    const allBookedSeats = [];
    Object.values(bookedForMovie).forEach((u) => {
      if (u && Array.isArray(u.seats)) {
        allBookedSeats.push(...u.seats);
      }
    });

    setBookedSeats(allBookedSeats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // пустой массив зависимостей → срабатывает один раз при монтировании

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleNext = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    if (!bookings[movie.id]) bookings[movie.id] = {};
    if (!bookings[movie.id][user.username])
      bookings[movie.id][user.username] = { seats: [] };

    bookings[movie.id][user.username].seats.push(...selectedSeats);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    localStorage.setItem(
      "selectedSeats",
      JSON.stringify({ movie, seats: selectedSeats })
    );

    navigate("/book-tickets");
  };

  if (!movie) return null;

  return (
    <div>
      <h2>Select Seats for {movie.title}</h2>
      <p>
        Date: {movie.date} | Time: {movie.time}
      </p>
      <div className="seats mb-3">
        {[...Array(30)].map((_, i) => {
          const seatNum = i + 1;
          const isBooked = bookedSeats.includes(seatNum);
          const isSelected = selectedSeats.includes(seatNum);
          return (
            <button
              key={seatNum}
              className={`btn m-1 ${
                isBooked
                  ? "btn-secondary"
                  : isSelected
                  ? "btn-success"
                  : "btn-outline-primary"
              }`}
              onClick={() => toggleSeat(seatNum)}
              disabled={isBooked}
            >
              {seatNum}
            </button>
          );
        })}
      </div>

      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={selectedSeats.length === 0}
      >
        Забронировать
      </button>
    </div>
  );
}

export default SelectSeats;
