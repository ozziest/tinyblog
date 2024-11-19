const ViewError = () => {
  return (
    <div className="border border-neutral-200 rounded p-5 flex flex-col gap-3">
      <h2 className="font-semibold text-neutral-800">
        Oops! Something went wrong.
      </h2>
      <p className="text-neutral-600">
        We encountered an unexpected error. Please try refreshing the page or
        come back later.
      </p>
    </div>
  );
};

export default ViewError;
