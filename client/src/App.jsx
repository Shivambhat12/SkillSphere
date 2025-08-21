import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import Home from "./pages/student/Home.jsx";
import CourseList from "./pages/student/CourseList.jsx";
import CourseDetails from "./pages/student/CourseDetails.jsx";
import MyEnrollments from "./pages/student/MyEnrollments.jsx";
import Player from "./pages/student/Player.jsx";
import Loading from "./components/students/Loading.jsx";
import Educator from "./pages/educator/Educator.jsx";
import Dashboard from "./pages/educator/Dashboard.jsx";
import AddCourse from "./pages/educator/AddCourse.jsx";
import MyCourses from "./pages/educator/MyCourses.jsx";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled.jsx";
import Navbar from "./components/students/Navbar.jsx";
import QuizDetailsPage from "./pages/student/QuizDetailsPage.jsx";
import QuizListPage from "./pages/student/QuizListPage.jsx";
import QuizStartPage from "./pages/student/QuizStartPage.jsx";
// used in add course in the educator page when the educato is adding a course to style the rich text
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import About from "./pages/student/About.jsx";
import ContactUs from "./pages/student/ContactUs.jsx";

function App() {
  console.log("ffffffffff");
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route path="/quiz/:id" element={<QuizDetailsPage />} />
        <Route path="/quiz/:id/start" element={<QuizStartPage />} />
      </Routes>
    </div>
  );
}

export default App;
