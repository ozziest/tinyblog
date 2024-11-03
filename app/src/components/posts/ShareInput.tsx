import Avatar from "@/components/user/Avatar";
import useAuthStore from "@/stores/authStore";
import { IPostApi } from "@/types/ApiTypes";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import LexicalEditor from "../inputs/LexicalEditor";
import classNames from "classnames";

export interface Props {
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
    <form
      className={classNames("border-b border-neutral-100 p-4 pb-3", {
        "bg-white": !parent,
        "bg-neutral-100": !!parent,
      })}
    >
      <div className={classNames("flex gap-2")}>
        <Avatar user={authStore.state.user} />
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
  );
};

export default ShareInput;
