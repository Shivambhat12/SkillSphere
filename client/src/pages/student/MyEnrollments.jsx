import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/students/Footer";
import { toast } from "react-toastify";
import axios from "axios";

function MyEnrollments() {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchUserEnrolledCourses,
    backendurl,
    getToken,
    calculateNoOfLecture,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendurl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const totalLectures = calculateNoOfLecture(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error("Failed to fetch course progress.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) fetchUserEnrolledCourses();
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) getCourseProgress();
  }, [enrolledCourses]);

  return (
    <>
      <div className="md:px-36 px-5 pt-10 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          My Enrollments
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 bg-white shadow-sm rounded-lg">
            <thead className="bg-gray-100 text-sm text-gray-700 max-sm:hidden">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Course</th>
                <th className="px-4 py-3 text-left font-semibold">Duration</th>
                <th className="px-4 py-3 text-left font-semibold">Completed</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index];
                const percent = progress
                  ? (progress.lectureCompleted * 100) / progress.totalLectures
                  : 0;

                return (
                  <tr
                    key={course._id}
                    className="border-t border-gray-200 text-sm text-gray-700"
                  >
                    <td className="px-4 py-4 flex items-center space-x-4">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-20 h-14 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium">{course.courseTitle}</p>
                        <Line
                          strokeWidth={2}
                          percent={percent}
                          strokeColor="#2563eb"
                          className="mt-2 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 max-sm:hidden">
                      {calculateCourseDuration(course)}
                    </td>
                    <td className="px-4 py-4 max-sm:hidden">
                      {progress
                        ? `${progress.lectureCompleted}/${progress.totalLectures}`
                        : "0/0"}{" "}
                      Lectures
                    </td>
                    <td className="px-4 py-4 max-sm:hidden">
                      <button
                        onClick={() => navigate("/player/" + course._id)}
                        className={`px-4 py-2 rounded-full text-white text-xs sm:text-sm ${
                          percent === 100
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        } transition duration-300`}
                      >
                        {percent === 100 ? "Completed" : "Continue"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyEnrollments;
