import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">MovieApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/browse">Browse Movies</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/book-tickets">Book Tickets</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
