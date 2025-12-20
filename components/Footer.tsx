import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold mb-2">
              <span className="text-white">i</span>
              <span className="text-azure">R</span>
              <span className="text-white">human.</span>
              <span className="text-amber">ai</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI Solutions for Business
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="#claude-skills"
              className="text-gray-400 hover:text-teal transition-colors"
            >
              Services
            </a>
            <a
              href="#voice-agents"
              className="text-gray-400 hover:text-teal transition-colors"
            >
              Voice Agents
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-teal transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            &copy; {currentYear} iRhuman.ai. All rights reserved.
          </div>
        </div>

        {/* Badge */}
        <div className="text-center mt-6 text-gray-500 text-xs">
          Made with AI
        </div>
      </div>
    </footer>
  );
};

export default Footer;
