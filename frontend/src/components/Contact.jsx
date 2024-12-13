import React from "react";
import { FaQuestionCircle, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import { TfiUser } from "react-icons/tfi";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const ContactSection = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Get in Touch Section */}
          <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-4xl font-semibold mb-6 text-indigo-700">Get in Touch</h2>
            <p className="text-gray-600 mb-6 text-lg">
              We're here to assist you with anything you need. Reach out to us for inquiries, support, or just to say hi!
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaQuestionCircle className="text-3xl text-indigo-600" />
                <div>
                  <h4 className="text-xl font-medium text-gray-800">FAQ</h4>
                  <p className="text-sm text-gray-500">Find quick answers to frequently asked questions.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-3xl text-green-600" />
                <div>
                  <h4 className="text-xl font-medium text-gray-800">Support</h4>
                  <p className="text-sm text-gray-500">Get in touch with our support team for personalized assistance.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaRegEnvelope className="text-3xl text-purple-600" />
                <div>
                  <h4 className="text-xl font-medium text-gray-800">Email Us</h4>
                  <p className="text-sm text-gray-500">Send us an email, and we'll get back to you shortly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send Message Section */}
          <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-4xl font-semibold mb-6 text-indigo-700">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactSection;
