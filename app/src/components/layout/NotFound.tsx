interface Props {
  message: string;
}

const NotFound = ({ message }: Props) => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-xl mt-4">{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
