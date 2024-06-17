/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSubscription } from "@apollo/client";
import { Avatar } from "@mui/material";
import { changeLanguage } from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CONTRACT_ACCEPTED,
  CONTRACT_REQUESTED,
  CONTRACT_STARTED,
} from "../graphql/contract";
import { logoutFinished } from "../redux/slices/authSlice";
export default function HomeNavbar() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const contractRequested = useSubscription(CONTRACT_REQUESTED);
  const contractAccepted = useSubscription(CONTRACT_ACCEPTED);
  const contractStarted = useSubscription(CONTRACT_STARTED);

  useEffect(() => {
    if (contractRequested.data) toast.info("You have new Contract Request !");
  }, [contractRequested.data, contractRequested.loading]);

  useEffect(() => {
    if (contractAccepted.data) toast.info("You have new Contract Accepted !");
  }, [contractAccepted.data, contractAccepted.loading]);

  useEffect(() => {
    if (contractStarted.data) toast.info("You have new Contract Started !");
  }, [contractStarted.data, contractStarted.loading]);

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
      hide: currentUser?.role === "freelance" || !currentUser?.role,
    },

    {
      label: "Messages",
      link: "/messages",
      hide: !currentUser?.role,
    },
    {
      label: "My Contracts",
      link: "/my-contracts",
      hide: !currentUser?.role,
      counter: contractRequested?.data?.contractRequested,
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
                  <li key={navbar.label}>
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
                      {t(navbar.label)}
                    </NavLink>

                    {navbar?.counter && (
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        1<span class="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </li>
                )
            )}

            {currentUser?.role === "employer" && (
              <li>
                <NavLink className="getstarted" to="/post-project">
                  {t("Post a Project")}
                </NavLink>
              </li>
            )}
          </ul>

          <ul></ul>
          <ul>
            {" "}
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
                style={{ padding: "0px 0 0px 30px" }}
              >
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {t("Language")}
                </span>{" "}
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center justify-content-start"
                    href={"#"}
                    onClick={() => {
                      changeLanguage("en");
                    }}
                  >
                    <span>{t("English")}</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center justify-content-start"
                    href={"#"}
                    onClick={() => {
                      changeLanguage("am");
                    }}
                  >
                    <span>{t("አማርኛ")}</span>
                  </a>
                </li>
              </ul>
            </li>
            {currentUser?.id && (
              <li className="nav-item dropdown pe-3">
                <a
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  href="#"
                  data-bs-toggle="dropdown"
                  style={{ padding: "0px 0 0px 30px" }}
                >
                  <Avatar></Avatar>
                  <span className="d-none d-md-block dropdown-toggle ps-2">
                    {currentUser.firstname}{" "}
                    {currentUser.lastname[0].toUpperCase() + "."}
                  </span>{" "}
                </a>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6 style={{ fontWeight: "bold" }}>
                      {currentUser.firstname} {currentUser.lastname}
                    </h6>
                    <span style={{ textTransform: "capitalize" }}>
                      {t(
                        currentUser.role === "freelance"
                          ? "Freelancer"
                          : "Client"
                      )}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center justify-content-start"
                      to={"/my-profile"}
                    >
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "18px" }}
                      ></i>
                      <span>{t("My Profile")}</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center justify-content-start"
                      href="#"
                      onClick={logout}
                    >
                      <i
                        className="bi bi-box-arrow-right"
                        style={{ fontSize: "18px" }}
                      ></i>
                      <span>{t("Sign Out")}</span>
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
