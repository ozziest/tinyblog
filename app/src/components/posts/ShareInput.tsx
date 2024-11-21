import Avatar from "@/components/user/Avatar";
import useAuthStore from "@/stores/authStore";
import { IPostApi } from "@/types/ApiTypes";
import { ExtendedPost, IPostStore } from "@/stores/postStore";
import LexicalEditor from "../inputs/LexicalEditor";
import classNames from "classnames";
import ShouldLoginWarning from "../inputs/ShouldLoginWarning";

export interface Props {
  initialState?: string;
  store: IPostStore;
  parent?: ExtendedPost;
  onShared?: (post: IPostApi) => void;
  showLocationChanger?: boolean;
}

const ShareInput = ({
  initialState = undefined,
  store,
  parent,
  onShared,
  showLocationChanger = true,
}: Props) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.state.isLoggedIn;

  if (!isLoggedIn) {
    return <ShouldLoginWarning />;
  }

  return (
    <form
      className={classNames("border-b border-neutral-100 p-4 pb-3", {
        "bg-white": !parent,
        "bg-neutral-100": !!parent,
      })}
    >
      <div className={classNames("flex gap-2")}>
        <Avatar src={authStore.state.user.avatar} />
        <div className="flex-grow">
          <LexicalEditor
            store={store}
            parent={parent}
            onShared={onShared}
            initialState={initialState}
            initialLocation={authStore.state.user.location || "WW"}
            showLocationChanger={showLocationChanger}
          />
        </div>
      </div>
    </form>
  );
};

export default ShareInput;
