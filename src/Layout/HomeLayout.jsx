import React from "react";
import { Outlet } from "react-router";
import HomeNavbar from "./HomeNavbar";

export default function HomeLayout() {
  return (
    <div id="home-body" style={{ height: "100vh", overflow: "hidden" }}>
      <HomeNavbar />

      <main
        id="main-home"
        style={{
          height: "calc(100% - 6rem)",
          border: "1px solid",
          position: "relative",
          marginTop: "6rem",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
