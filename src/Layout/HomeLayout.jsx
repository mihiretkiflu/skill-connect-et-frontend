import React from "react";
import { Outlet } from "react-router";
import HomeNavbar from "./HomeNavbar";

export default function HomeLayout() {
  return (
    <>
      <HomeNavbar />

      <main id="main-home">
        <Outlet />
      </main>
    </>
  );
}
