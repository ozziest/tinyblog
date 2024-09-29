import { useState } from "react";
import Avatar from "@/components/user/Avatar";
import api from "@/api";
import useAuthStore from "@/stores/authStore";
import { IPostApi } from "@/types/ApiTypes";
import { ExtendedPost, IPostStore } from "@/stores/shared";

interface Props {
  store: IPostStore;
  parent?: ExtendedPost;
  onShared?: (post: IPostApi) => void;
}

const ShareInput = ({ store, parent, onShared }: Props) => {
  const [content, setContent] = useState("");
  const authStore = useAuthStore();

  const handleCreate = async () => {
    const response = await api.post.store({
      content,
      parent_id: parent?.id,
    });
    const post = await response.json();

    authStore.increase("post");
    setContent("");

    const newPost: IPostApi = {
      id: post.id,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      stats_likes: 0,
      stats_shares: 0,
      stats_views: 0,
      stats_replies: 0,
      user: authStore.state.user,
      is_liked_by_you: false,
    };

    if (onShared) {
      onShared(newPost);
    } else {
      store.pushPost(newPost);
    }
  };

  return (
    <div className="border-b border-neutral-100 p-4 pb-3 sticky top-[40px] bg-white z-50">
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
                {parent ? "Reply" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShareInput;
