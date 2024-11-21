import classNames from "classnames";
import ShareInput, { Props } from "./ShareInput";

const StickyShareInput = ({
  initialState = undefined,
  store,
  parent,
  onShared,
}: Props) => {
  return (
    <div
      className={classNames(
        "hidden md:block sticky top-[50px] lg:top-[40px] z-40 bg-white",
      )}
    >
      <ShareInput
        store={store}
        parent={parent}
        initialState={initialState}
        onShared={onShared}
      />
    </div>
  );
};
export default StickyShareInput;
