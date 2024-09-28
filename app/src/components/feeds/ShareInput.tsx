import { useState } from "react";
import Avatar from "../user/Avatar";
import api from "../../api";
import useAuthStore from "../../stores/authStore";

interface Props {
  isReply?: boolean;
}

const ShareInput = ({ isReply = false }: Props) => {
  const [content, setContent] = useState("");
  const authStore = useAuthStore();

  const handleCreate = async () => {
    const response = await api.post.store({ content });
    // ???
    console.log(await response.json());
    authStore.increase("post");
    setContent("");
  };

  return (
    <div className="border-b border-neutral-100 p-4 pb-3 sticky top-[40px] bg-white">
      <form>
        <div className="flex gap-2">
          <Avatar user={authStore.state.user} size={12} />
          <div className=" flex-grow">
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="What's on your mind?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={240}
            />
            <div className="flex justify-between items-center pt-[2px]">
              <div className="text-neutral-500 text-sm">
                Share your thoughts...
              </div>
              <button
                type="button"
                className="px-3 py-1 border bg-gray-200 hover:bg-gray-300 rounded font-semibold text-sm"
                onClick={handleCreate}
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
