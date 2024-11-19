const GeneralError = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-white text-5xl font-bold">500</h1>
        <p className="text-white mt-6">
          We encountered an unexpected error. Please try refreshing the page or
          come back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-block text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-black transition-colors duration-300"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default GeneralError;
