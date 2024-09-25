interface Props {
  children: React.ReactNode;
}

const FeedContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col border border-neutral-100 rounded">
      {children}
    </div>
  );
};

export default FeedContainer;
