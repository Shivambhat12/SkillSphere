import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import axios from "axios";
import { toast } from "react-toastify";

function MyCourses() {
  const { currency, backendurl, getToken, isEducator } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendurl + "/api/educator/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.success && setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  return courses ? (
    <div className="min-h-screen flex flex-col items-start justify-start p-6 bg-gray-50 overflow-auto">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          My Courses
        </h2>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-800 text-sm font-medium">
              <tr>
                <th className="px-6 py-4 text-left">Course</th>
                <th className="px-6 py-4 text-left">Earnings</th>
                <th className="px-6 py-4 text-left">Students</th>
                <th className="px-6 py-4 text-left">Published On</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={course.courseThumbnail}
                      alt="course image"
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <span className="truncate w-40 md:w-72">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MyCourses;
