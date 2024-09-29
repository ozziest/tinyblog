import ActionButton from "./ActionButton";

const FeedActions = () => {
  return (
    <div className="flex gap-4 pt-2">
      <ActionButton icon="♥" count={10} isSelected={false} />
      <ActionButton icon="📢" count={5} isSelected={true} />
    </div>
  );
};

export default FeedActions;
