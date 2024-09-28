import { Link } from "react-router-dom";

const PageNotFoundView = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white text-9xl font-bold">404</h1>
        <p className="text-white text-2xl mt-4">Page Not Found</p>
        <Link
          to="/"
          className="mt-6 inline-block text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFoundView;
