import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const menus = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Clients", link: "/clients" },
    { label: "Freelancer", link: "/freelancers" },
    { label: "Jobs", link: "/jobs" },

    {
      label: "Job Category",
      link: "/job-category",
    },
    {
      label: "Job Sub Category",
      link: "/job-sub-category",
    },
    { label: "Skills", link: "/Skills" },
  ];

  return (
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">
        <li class="nav-heading">Pages</li>

        {menus?.map((menu) =>
          !menu.subMenus ? (
            <li class="nav-item" key={menu.label}>
              <Link class="nav-link collapsed" to={menu.link}>
                <i class="bi bi-grid"></i>
                <span>{menu.label}</span>
              </Link>
            </li>
          ) : (
            <li class="nav-item" key={menu.label}>
              <a
                class="nav-link collapsed"
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <i class="bi bi-menu-button-wide"></i>
                <span>{menu.label}</span>
                <i class="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id="components-nav"
                class="nav-content collapse"
                data-bs-parent="#sidebar-nav"
              >
                {menu.subMenus.map((subMenu) => (
                  <li key={subMenu.label}>
                    <Link to={menu.link + subMenu.link}>
                      <i class="bi bi-circle"></i>
                      <span>{subMenu.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </aside>
  );
}
