import React from "react";
import Footer from "../../components/students/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Got questions, feedback, or ideas? We’d love to hear from you. Reach
            out and let’s build something amazing together.
          </p>
        </section>

        {/* Contact Info + Form */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">Get In Touch</h2>
            <p className="text-gray-600">
              You can contact us directly via email, or simply fill out the form
              and we’ll get back to you as soon as possible.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              <p>
                <span className="font-semibold">📧 Email:</span>{" "}
                shivambhatnagar321@gmail.com
              </p>
              <p>
                <span className="font-semibold">📍 Location:</span> Prayagraj,
                India
              </p>
              <p>
                <span className="font-semibold">🔗 Follow Us:</span>
              </p>
              <div className="flex space-x-4 text-indigo-600">
                <a
                  href="https://www.linkedin.com/in/shivam-bhatnagar-490a64291/"
                  target="_blank"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Shivambhat12"
                  target="_blank"
                  className="hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://www.facebook.com/shivam.bhatnagar.716195/"
                  target="_blank"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Send a Message
            </h2>
            <form
              className="space-y-4"
              action="https://formspree.io/f/mblknllk"
              method="POST"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
