import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function HomeNavbar() {
  const { currentUser } = useSelector((state) => state.auth);

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
      hide: currentUser?.role !== "freelance",
    },
    {
      label: "My Contracts",
      link: "/my-contracts",
      hide: currentUser?.role !== "freelance",
    },
    {
      label: "Login",
      link: "/login",
      hide: currentUser?.role,
    },
    {
      label: "Sign Up",
      link: "/sign-up",
      hide: currentUser?.role,
    },
    {
      label: "Create Profile",
      link: "/create-profile",
      hide: currentUser?.role !== "freelance",
    },
    {
      label: "My Profile",
      link: "/my-profile",
      hide: !currentUser?.role,
    },
  ];

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <nav id="navbar" className="navbar">
          <ul>
            {navbars.map(
              (navbar) =>
                !navbar?.hide && (
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
                )
            )}

            {currentUser?.role === "employer" && (
              <li>
                <NavLink className="getstarted" to="/post-project">
                  Post a Project
                </NavLink>
              </li>
            )}
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}
