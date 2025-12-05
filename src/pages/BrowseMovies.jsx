import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BrowseMovies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

    // Если localStorage пустой — добавляем примеры фильмов
    if (savedMovies.length === 0) {
      savedMovies = [
        {
          id: 1,
          title: "Avengers: Endgame",
          description: "The epic conclusion of the Avengers saga.",
          date: "2025-12-10",
          time: "18:00",
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
        },
        {
          id: 2,
          title: "Inception",
          description: "A mind-bending thriller by Christopher Nolan.",
          date: "2025-12-11",
          time: "20:00",
          image:
            "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
        },
        {
          id: 3,
          title: "The Lion King",
          description: "The classic Disney story comes to life.",
          date: "2025-12-12",
          time: "16:00",
          image:
            "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
        },
      ];

      localStorage.setItem("movies", JSON.stringify(savedMovies));
    }

    setMovies(savedMovies);
  }, []);

  const handleBook = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/select-seats");
  };

  return (
    <div>
      <h2>Browse Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={movie.image}
                alt={movie.title}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover", borderRadius: "1rem 1rem 0 0" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <p className="text-muted">
                  Date: {movie.date} <br />
                  Time: {movie.time}
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleBook(movie)}
                >
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseMovies;
