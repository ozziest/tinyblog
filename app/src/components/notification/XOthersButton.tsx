import { INotificationApi } from "@/types/ApiTypes";

interface Props {
  notification: INotificationApi;
  count: number;
}

const XOthersButton = ({ notification, count }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("showAllUsers", notification);
  };

  return (
    <button
      type="button"
      className="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
      onClick={handleClick}
    >
      {count} others
    </button>
  );
};
export default XOthersButton;
