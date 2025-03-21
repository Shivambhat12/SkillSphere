import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Sidebar from "../../components/educator/Sidebar";
import Footer from "../../components/educator/Footer";
function Educator() {
  return (
    <div className="text default min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        {/* outlet is the place where child routes will be rendered */}
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Educator;
