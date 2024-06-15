import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <SideBar />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>{t("Dashboard")}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">{t("Dashboard")}</li>
            </ol>
          </nav>
        </div>

        <section
          className="section dashboard"
          style={{ height: "calc(100vh - 11rem)" }}
        >
          <Outlet />
        </section>
      </main>
    </>
  );
}
