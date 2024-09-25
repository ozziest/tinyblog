import Avatar from "../user/Avatar";

interface Props {
  isReply?: boolean;
}

const ShareInput = ({ isReply = false }: Props) => {
  return (
    <div className="border-b border-neutral-100 p-4 pb-3 sticky top-[40px] bg-white">
      <form>
        <div className="flex gap-2">
          <Avatar src="https://i.pravatar.cc/300" size={12} />
          <div className=" flex-grow">
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="What's on your mind?"
            />
            <div className="flex justify-between items-center pt-[2px]">
              <div className="text-neutral-500 text-sm">
                Share your thoughts...
              </div>
              <button
                type="submit"
                className="px-3 py-1 border bg-gray-200 hover:bg-gray-300 rounded font-semibold text-sm"
              >
                {isReply ? "Reply" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShareInput;
