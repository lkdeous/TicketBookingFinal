import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BrowseMovies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [
      { id: 1, title: "Avengers", description: "Superhero movie" },
      { id: 2, title: "Inception", description: "Mind-bending thriller" },
      { id: 3, title: "The Lion King", description: "Animated classic" },
    ];
    setMovies(savedMovies);
    localStorage.setItem("movies", JSON.stringify(savedMovies));
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
          <div key={movie.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <button
                  className="btn btn-primary"
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
