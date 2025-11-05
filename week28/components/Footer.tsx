import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiVelog } from "react-icons/si";

export default function Footer() {
  return (
    <>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="text-gray-500 ml-3 text-xl">멋쟁이사자처럼</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2025 Likelions —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @Jihaeee
            </a>
          </p>
          {/* 소셜 아이콘 */}
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-x-5">
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              <FaGithub size={22} />
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              <SiVelog size={22} />
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
