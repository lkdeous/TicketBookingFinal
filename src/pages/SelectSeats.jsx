import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectSeats() {
  const navigate = useNavigate();
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleNext = () => {
    localStorage.setItem(
      "selectedSeats",
      JSON.stringify({ movie, seats: selectedSeats })
    );
    navigate("/book-tickets");
  };

  return (
    <div>
      <h2>Select Seats for {movie?.title}</h2>
      <div className="seats mb-3">
        {[...Array(30)].map((_, i) => (
          <button
            key={i}
            className={`btn m-1 ${
              selectedSeats.includes(i + 1)
                ? "btn-success"
                : "btn-outline-primary"
            }`}
            onClick={() => toggleSeat(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleNext}>
        Забронировать
      </button>
    </div>
  );
}

export default SelectSeats;
