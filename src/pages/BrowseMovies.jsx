import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BrowseMovies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) navigate("/login");
    else setCurrentUser(user);

    let savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    if (savedMovies.length === 0) {
      savedMovies = [
        { id: 1, title: "Avengers", description: "Action", date: "2025-12-10", time: "18:00", image: "" },
        { id: 2, title: "Inception", description: "Thriller", date: "2025-12-11", time: "20:00", image: "" }
      ];
      localStorage.setItem("movies", JSON.stringify(savedMovies));
    }
    setMovies(savedMovies);
  }, [navigate]);

  const handleBook = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/select-seats");
  };

  if (!currentUser) return null;

  return (
    <div>
      <h2>Browse Movies</h2>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-3">
            <div className="card p-2">
              <h5>{movie.title}</h5>
              <p>{movie.description}</p>
              <p>{movie.date} | {movie.time}</p>
              <button className="btn btn-primary" onClick={() => handleBook(movie)}>Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseMovies;
