const Stats = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="flex flex-col bg-neutral-100 w-full rounded p-2">
      <div className="text-center font-bold text-neutral-800">{count}</div>
      <div className="text-center text-sm font-semibold text-neutral-400">
        {title}
      </div>
    </div>
  );
};

export default Stats;
