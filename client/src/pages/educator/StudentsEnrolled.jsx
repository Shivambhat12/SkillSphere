import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Loading from "../../components/students/Loading";
import { toast } from "react-toastify";

function StudentsEnrolled() {
  const { backendurl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendurl + "/api/educator/enrolled-students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-start bg-gray-50 p-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Enrolled Students
        </h2>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-800 text-sm font-medium">
              <tr>
                <th className="px-6 py-4 text-center">#</th>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-left">Course Title</th>
                <th className="px-6 py-4 text-left hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {enrolledStudents.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={item.student.imageUrl}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="truncate w-32 md:w-56">
                      {item.student.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 truncate">{item.courseTitle}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {new Date(item.purchaseDate).toLocaleDateString()}
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

export default StudentsEnrolled;
