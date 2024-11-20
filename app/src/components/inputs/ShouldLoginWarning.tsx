import { Link } from "react-router-dom";

const ShouldLoginWarning = () => {
  return (
    <div className="flex items-center justify-center bg-yellow-100 border border-yellow-300 p-4 text-center">
      <div>
        <p className="text-yellow-800 font-semibold text-lg">Welcome! 😊</p>
        <p className="text-yellow-700 mt-2">
          To share your thoughts, please{" "}
          <Link to="/auth/login" className="font-bold">
            log in
          </Link>{" "}
          or{" "}
          <Link to="/auth/register" className="font-bold">
            sign up
          </Link>
          .
        </p>
        <div className="pt-5 pb-2">
          <Link
            to="/auth/register"
            className="mt-4 px-4 py-3 bg-indigo-900 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Join network
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShouldLoginWarning;
