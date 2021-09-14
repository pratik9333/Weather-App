import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const context = useContext(UserContext);

  return (
    <section className="nav-sec">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark py-2">
          <a className="navbar-brand">WeatherApp</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto p-2">
              {context.user ? (
                <>
                  <li className="nav-item mr-4">
                    <span tag={NavLink}>
                      {context.user?.email}{" "}
                      <span className="sr-only">(current)</span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      tag={NavLink}
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => context.setUser(null)}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">
                      Signup <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/Login" className="nav-link">
                      Login <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
