import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
function CourseCard({ course }) {
  const { currency, calculateRating } = useContext(AppContext);
  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="group relative border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-400/50"
    >
      {/* Optional Discount/Best Seller Badge */}
      {course.discount > 30 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
          Best Seller
        </span>
      )}

      {/* Image Container with Gradient Overlay */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          src={course.courseThumbnail}
          alt={course.courseTitle}
        />
        {/* Gradient overlay to enhance text contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Course Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{course.educator.name}</p>

        {/* Ratings */}
        <div className="flex items-center space-x-1 mb-2">
          <span className="text-sm font-medium text-yellow-500">
            {calculateRating(course)}
          </span>
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({course.courseRatings.length})
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-semibold text-gray-900">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
