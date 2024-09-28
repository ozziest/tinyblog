import { LogoIcon } from "../Icons";

const LogoFull = () => {
  return (
    <>
      <div className="text-indigo-800 flex justify-center">
        <LogoIcon size={100} />
      </div>
      <h1 className="text-center text-xl font-semibold pb-4 text-neutral-700">
        tinyblog.space
      </h1>
    </>
  );
};

export default LogoFull;
