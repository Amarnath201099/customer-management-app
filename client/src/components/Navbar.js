// src/components/Navbar.js
import { NavLink } from "react-router-dom";

function Navbar() {
  const handleNavItemClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Only collapse if we're on small screens and the menu is open
    if (
      window.innerWidth < 992 &&
      navbarToggler &&
      navbarCollapse.classList.contains("show")
    ) {
      navbarToggler.click();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid mx-4 p-0">
        <NavLink className="navbar-brand" to="/">
          Qwipo
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active active-link" : "")
                }
                end
                onClick={handleNavItemClick}
              >
                Customers List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/customers/new"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active active-link" : "")
                }
                onClick={handleNavItemClick}
              >
                Add Customer
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
