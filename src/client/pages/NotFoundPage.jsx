import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      
      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold text-blue-700 mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition duration-300"
      >
        Go Back Home
      </Link>

    </div>
  );
}