import React from "react";
import { NavLink } from "react-router-dom";

export default function HomeNavbar() {
  const navbars = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Find Work",
      link: "/find-work",
    },
    {
      label: "Find Freelancer",
      link: "/find-freelancer",
    },
    {
      label: "My Projects",
      link: "/my-projects",
    },
    {
      label: "My Contracts",
      link: "/my-contracts",
    },
    {
      label: "Login",
      link: "/login",
    },
    {
      label: "Sign Up",
      link: "/sign-up",
    },
  ];

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <nav id="navbar" className="navbar">
          <ul>
            {navbars.map((navbar) => (
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "nav-link pending"
                      : isActive
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to={navbar.link}
                >
                  {navbar.label}
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink className="getstarted" to="/post-project">
                Post a Project
              </NavLink>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}
