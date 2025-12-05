import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import BrowseMovies from "./pages/BrowseMovies.jsx";
import SelectSeats from "./pages/SelectSeats.jsx";
import BookTickets from "./pages/BookTickets.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseMovies />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/book-tickets" element={<BookTickets />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
