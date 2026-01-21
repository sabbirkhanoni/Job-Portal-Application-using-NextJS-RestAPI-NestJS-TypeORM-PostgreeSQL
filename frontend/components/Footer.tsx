import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h2 className="text-xl font-semibold text-white">Job Board</h2>
            <p className="mt-2 text-sm">
              Find your dream job or hire the best talent with ease.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition">Jobs</li>
              <li className="hover:text-white transition">Companies</li>
              <li className="hover:text-white transition">Post a Job</li>
              <li className="hover:text-white transition">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-xl">
              <a href="#" className="hover:text-white transition">
                <FaGithub />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedin />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Job Board. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
