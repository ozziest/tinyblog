interface Props {
  title: string;
  description: string;
}

const EmptyData = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 rounded-lg p-6 text-center">
      <h2 className="text-gray-600 text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyData;
