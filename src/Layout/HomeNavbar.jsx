/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutFinished } from "../redux/slices/authSlice";

export default function HomeNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const navbars = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Find Work",
      link: "/find-work",
      hide: currentUser?.role !== "freelance",
    },
    {
      label: "Find Freelancer",
      link: "/find-freelancer",
      hide: currentUser?.role === "freelance",
    },
    {
      label: "My Projects",
      link: "/my-projects",
      hide: currentUser?.role !== "freelance",
    },
    {
      label: "Messages",
      link: "/messages",
      hide: !currentUser?.role,
    },
    {
      label: "My Contracts",
      link: "/my-contracts",
      hide: currentUser?.role !== "freelance",
    },
    {
      label: "My Jobs",
      link: "/my-jobs",
      hide: currentUser?.role === "freelance",
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
  ];

  const logout = () => {
    dispatch(logoutFinished());
    navigate("/");
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <nav
          id="navbar"
          className="navbar d-flex justify-content-between"
          style={{ width: currentUser?.id && "100%" }}
        >
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

          <ul>
            {currentUser?.id && (
              <li class="nav-item dropdown pe-3">
                <a
                  class="nav-link nav-profile d-flex align-items-center pe-0"
                  href="#"
                  data-bs-toggle="dropdown"
                  style={{ padding: "0px 0 0px 30px" }}
                >
                  <img
                    src="assets/img/profile-img.jpg"
                    alt="Profile"
                    class="rounded-circle"
                    style={{ height: "3rem" }}
                  />
                  <span class="d-none d-md-block dropdown-toggle ps-2">
                    {currentUser.firstname}{" "}
                    {currentUser.lastname[0].toUpperCase() + "."}
                  </span>{" "}
                </a>

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li class="dropdown-header">
                    <h6 style={{ fontWeight: "bold" }}>
                      {currentUser.firstname} {currentUser.lastname}
                    </h6>
                    <span style={{ textTransform: "capitalize" }}>
                      {currentUser.role === "freelance"
                        ? "Freelancer"
                        : "Client"}
                    </span>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      class="dropdown-item d-flex align-items-center justify-content-start"
                      to={"/my-profile"}
                    >
                      <i class="bi bi-person" style={{ fontSize: "18px" }}></i>
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      class="dropdown-item d-flex align-items-center justify-content-start"
                      href="#"
                      onClick={logout}
                    >
                      <i
                        class="bi bi-box-arrow-right"
                        style={{ fontSize: "18px" }}
                      ></i>
                      <span>Sign Out</span>
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}
