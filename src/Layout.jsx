import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const navClass =
    "px-4 py-2 text-sm font-medium text-blue-900 hover:text-blue-700";

  const activeClass =
    "underline text-blue-800 font-semibold";

  return (
    <>
      <Header />
      <nav className="bg-white px-6 py-3 shadow-sm flex gap-4">
        <NavLink to="/" end className={({ isActive }) => isActive ? `${navClass} ${activeClass}` : navClass}>
          Dashboard
        </NavLink>
        <NavLink to="/slots" className={({ isActive }) => isActive ? `${navClass} ${activeClass}` : navClass}>
          Slots
        </NavLink>
        <NavLink to="/vehicles" className={({ isActive }) => isActive ? `${navClass} ${activeClass}` : navClass}>
          Vehicles
        </NavLink>
      </nav>
      <div className="container mx-auto mt-6 px-4">
        <Outlet />
      </div>
    </>
  );
}
