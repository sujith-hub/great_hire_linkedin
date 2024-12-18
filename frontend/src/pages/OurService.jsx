import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";

const OurService = () => {
   const navigate = useNavigate();
  const services = [
    {
      title: "Accounts and Payroll",
      description:
        "Streamline your financial operations and payroll management with precision.",
      icon: "💼",
    },
    {
      title: "Digital Marketing",
      description:
        "Enhance your online presence and connect with your audience effectively.",
      icon: "📈",
    },
    {
      title: "Staffing",
      description:
        "Find the right talent for your organization with our expert staffing solutions.",
      icon: "🤝",
    },
    {
      title: "Web & Mobile App Development",
      description:
        "Develop and maintain high-quality web and mobile applications tailored to your needs.",
      icon: "📱",
    },
    {
      title: "BPO",
      description:
        "Optimize business processes and reduce operational costs with our BPO services.",
      icon: "📞",
    },
    {
      title: "Cybersecurity Services",
      description:
        "Protect your business with advanced cybersecurity solutions.",
      icon: "🔒",
    },
    {
      title: "Cloud Computing Services",
      description:
        "Leverage cloud technologies to improve scalability and flexibility.",
      icon: "☁️",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Integrate AI and ML to automate processes and drive innovation.",
      icon: "🤖",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Our Services Tailored for Your Success
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Explore our diverse range of services designed to meet your
              business needs.
            </p>
          </div>
        </header>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let's Work Together
            </h2>
            <p className="mt-4 text-lg">
              Ready to take your business to the next level? Get in touch with
              us today.
            </p>
            <button className="mt-8 bg-white text-blue-500 py-3 px-8 rounded-lg shadow-lg font-medium hover:bg-gray-100 transition duration-300" onClick={()=> navigate('/contact')}>
              Contact Us
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default OurService;
