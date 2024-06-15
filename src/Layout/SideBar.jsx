import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const menus = [
    { label: "Dashboard", link: "/admin/dashboard", icon: "bi-grid-fill" },
    { label: "Clients", link: "/admin/clients", icon: "bi-people-fill" },
    {
      label: "Freelancers",
      link: "/admin/freelancers",
      icon: "bi-person-workspace",
    },
    { label: "Jobs", link: "/admin/jobs", icon: "bi-journal-bookmark" },

    { label: "Skills", link: "/admin/Skills", icon: "bi-card-checklist" },
  ];

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-heading">Pages</li>

        {menus?.map((menu) =>
          !menu.subMenus ? (
            <li className="nav-item" key={menu.label}>
              <Link className="nav-link collapsed" to={menu.link}>
                <i className={"bi " + menu.icon}></i>
                <span>{menu.label}</span>
              </Link>
            </li>
          ) : (
            <li className="nav-item" key={menu.label}>
              <a
                className="nav-link collapsed"
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="#"
              >
                <i className="bi bi-menu-button-wide"></i>
                <span>{menu.label}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id="components-nav"
                className="nav-content collapse"
                data-bs-parent="#sidebar-nav"
              >
                {menu.subMenus.map((subMenu) => (
                  <li key={subMenu.label}>
                    <Link to={menu.link + subMenu.link}>
                      <i className="bi bi-circle"></i>
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
