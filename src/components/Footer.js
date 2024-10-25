import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-500 to-indigo-700 fixed bottom-0 w-full text-white z-100 p-3">
            <div className="container flex flex-col md:flex-row justify-between items-center">
                {/* Left Section - Links */}
                <div className="hidden sm:hidden md:block mb-4 md:mb-0">
                    <a href="/about" className="text-sm text-gray-400 hover:text-white ml-2 underline">
                        About Us
                    </a>
                    <a href="/privacy" className="text-sm text-gray-400 hover:text-white ml-2 underline">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-sm text-gray-400 hover:text-white ml-2 underline">
                        Terms of Service
                    </a>
                </div>


                {/* Center Section - Social Media Icons */}
                <div className="hidden sm:hidden md:hidden lg:block flex space-x-4 mb-2 md:mb-0">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                {/* Right Section - Copyright */}
                <div className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Online Assessment Portal. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
