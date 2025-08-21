import React from "react";
import Footer from "../../components/students/Footer";
function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Who We Are */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">
            Who We Are
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            SkillSphere is a modern learning ecosystem designed to bridge the
            gap between knowledge and real-world application. We are passionate
            about empowering learners to gain practical skills through
            mentorship, interactive resources, and project-driven learning.
          </p>
        </section>

        {/* Mission, Vision, Values */}
        <section>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm">
                To make learning engaging, accessible, and practical for
                everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm">
                A world where every learner can unlock their potential through
                skills, mentorship, and community-driven growth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-600 text-sm">
                Collaboration, curiosity, and continuous improvement are at the
                heart of everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-700">
            Why Choose SkillSphere?
          </h2>
          <ul className="mt-6 space-y-4 text-gray-600 max-w-2xl mx-auto text-left">
            <li>✅ Hands-on, project-based learning</li>
            <li>✅ Guided mentorship and support</li>
            <li>✅ Practical, real-world skills development</li>
            <li>✅ Community-driven growth & collaboration</li>
          </ul>
        </section>

        {/* Join Us */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-700">
            Join Us & Start Your Journey 🚀
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Whether you're a student, a professional, or a lifelong learner,
            SkillSphere is here to help you unlock your potential. Together,
            let’s shape the future of learning.
          </p>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default About;
