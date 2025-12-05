import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Admin from "./pages/Admin";
import BrowseMovies from "./pages/BrowseMovies";
import SelectSeats from "./pages/SelectSeats";
import BookTickets from "./pages/BookTickets";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<BrowseMovies />} />
          <Route path="/browse-movies" element={<BrowseMovies />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/book-tickets" element={<BookTickets />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
