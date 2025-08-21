import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/students/Loading";
import axios from "axios";

function Dashboard() {
  const { currency, backendurl, isEducator, getToken } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendurl + "/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 p-4 pt-8 pb-0">
      <div className="space-y-8 w-full">
        {/* Total Stats Cards */}
        <div className="flex flex-wrap gap-5 items-center justify-between">
          <div className="flex items-center gap-3 shadow-xl hover:shadow-2xl border border-blue-500 p-4 w-56 rounded-md transition-all duration-300 ease-in-out">
            <img
              src={assets.patients_icon}
              alt="patients"
              className="w-12 h-12"
            />
            <div>
              <p className="text-3xl font-semibold text-gray-800">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-sm text-gray-500">Total Enrolments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-xl hover:shadow-2xl border border-blue-500 p-4 w-56 rounded-md transition-all duration-300 ease-in-out">
            <img
              src={assets.appointments_icon}
              alt="appointments"
              className="w-12 h-12"
            />
            <div>
              <p className="text-3xl font-semibold text-gray-800">
                {dashboardData.totalCourses}
              </p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-xl hover:shadow-2xl border border-blue-500 p-4 w-56 rounded-md transition-all duration-300 ease-in-out">
            <img
              src={assets.earning_icon}
              alt="earnings"
              className="w-12 h-12"
            />
            <div>
              <p className="text-3xl font-semibold text-gray-800">
                {currency}
                {dashboardData.totalEarnings}
              </p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Latest Enrollments Section */}
        <div>
          <h2 className="pb-4 text-2xl font-semibold text-gray-800">
            Latest Enrollments
          </h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-md">
            <table className="min-w-full table-auto">
              <thead className="text-gray-800 border-b bg-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-center">#</th>
                  <th className="px-6 py-4 font-semibold">Student Name</th>
                  <th className="px-6 py-4 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-6 py-4 truncate">{item.courseTile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
