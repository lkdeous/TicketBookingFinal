import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import BrowseMovies from "./pages/BrowseMovies.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import SelectSeats from "./pages/SelectSeats.jsx";
import BookTickets from "./pages/BookTickets.jsx";
import Admin from "./pages/Admin.jsx";

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
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
