import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 
    px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70"
    >
      <h1 className="md:text-home-heading-large text-home-heading-small relative text-gray-800 max-w-3xl mx-auto text-4xl md:text-5xl font-bold tracking-tight leading-tight">
        Empower your future with the courses designed to
        <span className="text-blue-600">fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0 animate-fade-in"
        />
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto text-lg">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <p className="md:hidden text-gray-500 max-w-sm mx-auto text-lg">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>

      <SearchBar />

      <div className="mt-6">
        <Link to={"/course-list"} onClick={() => scrollTo(0, 0)}>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg shadow-md hover:bg-blue-700 transition duration-300">
            Explore Courses
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
