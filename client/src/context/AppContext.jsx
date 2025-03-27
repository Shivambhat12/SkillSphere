import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setallCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/course/all");
      if (data.success) {
        setallCourses(data.courses);
      } else {
        console.log("appconstext fetchalluser");
        toast.error(data.message);
      }
    } catch (error) {
      console.log("appconstext fetchalluser");
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    if (user.publicMetadata.role === "educator") {
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(backendurl + "/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("appconstext fetchuser");

      toast.error(error.message);
    }
  };

  const calculateRating = (course) => {
    if (course.courseRating.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  // function to create course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 100, { units: ["h", "m"] });
  };
  // function to count the course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 100, { units: ["h", "m"] });
  };
  // function to calculate no of lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  //fetching user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendurl + "/api/user/enrolled-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        console.log("appconstext fetchUserEnrolledCourses1");
        toast.error(data.message);
      }
    } catch (error) {
      console.log("appconstext fetchUserEnrolledCourses2");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [user]);
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendurl,
    userData,
    setUserData,
    getToken,
    fetchAllCourses,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
