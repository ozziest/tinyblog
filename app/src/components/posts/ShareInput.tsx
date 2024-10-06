import Avatar from "@/components/user/Avatar";
import useAuthStore from "@/stores/authStore";
import { IPostApi } from "@/types/ApiTypes";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import classNames from "classnames";
import LexicalEditor from "../inputs/LexicalEditor";

interface Props {
  initialState?: string;
  store: IPostStore;
  parent?: ExtendedPost;
  onShared?: (post: IPostApi) => void;
}

const ShareInput = ({
  initialState = undefined,
  store,
  parent,
  onShared,
}: Props) => {
  const authStore = useAuthStore();

  return (
    <div
      className={classNames(
        "border-b border-neutral-100 p-4 pb-3 sticky top-[40px] z-50",
        { "bg-white": !parent, "bg-neutral-100": !!parent },
      )}
    >
      <form>
        <div className="flex gap-2">
          <Avatar user={authStore.state.user} size={12} />
          <div className="flex-grow">
            <LexicalEditor
              store={store}
              parent={parent}
              onShared={onShared}
              initialState={initialState}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShareInput;
