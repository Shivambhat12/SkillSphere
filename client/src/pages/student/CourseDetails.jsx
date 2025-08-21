import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/students/Footer";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

function CourseDetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    backendurl,
    userData,
    getToken,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/course/${id}`);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load course details.");
    }
  };

  const enrollCourse = async () => {
    if (!userData) return toast.warn("Please login to enroll");
    if (isAlreadyEnrolled) return toast.warn("You're already enrolled");
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendurl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Enrollment failed");
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="relative md:px-36 px-6 pt-20 pb-10 bg-gray-50 text-gray-800">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-10">
          {/* LEFT COLUMN */}
          <div className="flex-1 max-w-3xl">
            <h1 className="text-3xl font-bold">{courseData.courseTitle}</h1>
            <p
              className="pt-4 text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 200),
              }}
            ></p>

            {/* Ratings */}
            <div className="flex items-center space-x-2 pt-3 pb-1 text-sm text-gray-500">
              <p>{calculateRating(courseData)}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    className="w-4 h-4"
                    alt="star"
                  />
                ))}
              </div>
              <p>
                ({courseData.courseRating.length}{" "}
                {courseData.courseRating.length === 1 ? "rating" : "ratings"})
              </p>
              <p className="text-blue-600">
                ({courseData.enrolledStudents?.length || 0}{" "}
                {courseData.enrolledStudents?.length === 1
                  ? "student"
                  : "students"}
                )
              </p>
            </div>

            <p className="text-sm">
              Course by{" "}
              <span className="text-blue-600 underline">
                {courseData.educator.name}
              </span>
            </p>

            {/* Course Structure */}
            <div className="pt-8">
              <h2 className="text-xl font-semibold mb-3">Course Structure</h2>
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 mb-2 rounded overflow-hidden"
                >
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="toggle"
                      />
                      <p className="font-medium">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm">
                      {chapter.chapterContent.length} lectures –{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="border-t border-gray-300 list-disc px-6 py-2 text-sm text-gray-700">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex justify-between items-start py-1"
                        >
                          <div className="flex gap-2 items-start">
                            <img
                              src={assets.play_icon}
                              className="w-4 mt-1"
                              alt="play"
                            />
                            <span>{lecture.lectureTitle}</span>
                          </div>
                          <div className="flex gap-4">
                            {lecture.isPreviewFree && (
                              <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl
                                      .split("/")
                                      .pop(),
                                  })
                                }
                              >
                                Preview
                              </span>
                            )}
                            <span>
                              {humanizeDuration(
                                lecture.lectureDuration * 60000,
                                { units: ["h", "m"], round: true }
                              )}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Description */}
            <div className="pt-16 text-gray-700">
              <h3 className="text-xl font-semibold">Course Description</h3>
              <div
                className="pt-3 rich-text text-sm"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              ></div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full max-w-md bg-white rounded shadow-md overflow-hidden">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img
                src={courseData.courseThumbnail}
                alt="Course Thumbnail"
                className="w-full object-cover aspect-video"
              />
            )}

            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-red-500">
                <img
                  src={assets.time_left_clock_icon}
                  alt="clock"
                  className="w-4"
                />
                <p>
                  <strong>5 days</strong> left at this price
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <p className="text-2xl font-semibold text-gray-800">
                  {currency}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>
                <p className="text-lg text-gray-500 line-through">
                  {currency}
                  {courseData.coursePrice}
                </p>
                <p className="text-lg text-gray-500">
                  {courseData.discount}% off
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-4">
                <div className="flex gap-1 items-center">
                  <img src={assets.star} alt="star" />
                  <span>{calculateRating(courseData)}</span>
                </div>
                <div className="w-px h-4 bg-gray-400/50" />
                <div className="flex gap-1 items-center">
                  <img src={assets.time_clock_icon} alt="clock" />
                  <span>{calculateCourseDuration(courseData)}</span>
                </div>
                <div className="w-px h-4 bg-gray-400/50" />
                <div className="flex gap-1 items-center">
                  <img src={assets.lesson_icon} alt="lessons" />
                  <span>{calculateNoOfLectures(courseData)} lessons</span>
                </div>
              </div>

              <button
                onClick={enrollCourse}
                className={`w-full py-3 mt-6 rounded text-white font-medium ${
                  isAlreadyEnrolled
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <div className="pt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  What's in the course?
                </h4>
                <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default CourseDetails;
