import React from 'react';
import { FaSquareThreads } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company info section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">
              Great<span className="text-[#f83552]">Hire</span>
            </h2>
            <p className="text-sm mt-2">© 2024 Your Company. All rights reserved.</p>
          </div>

          {/* Social media icons */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <a
              href="https://www.facebook.com/share/15WGT743qv/"
              className="hover:text-gray-200 transition-colors"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebookSquare className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/"
              className="hover:text-gray-200 transition-colors"
              target="_blank"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/greathire/"
              className="hover:text-gray-200 transition-colors"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/great_hire?igsh=YnQ1a3g2a3Bhc25p"
              className="hover:text-gray-200 transition-colors"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagramSquare className="w-6 h-6" />
            </a>
            <a
              href="https://www.threads.net/@great_hire"
              className="text-white hover:text-gray-200 transition-colors"
              target="_blank"
              aria-label="Threads"
            >
              <FaSquareThreads className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
