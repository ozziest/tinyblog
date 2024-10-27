import { IUserApi } from "@/types/ApiTypes";
import Avatar from "./Avatar";
import useAuthStore from "@/stores/authStore";
import Button from "../inputs/Button";
import api from "@/api";
import UserEditModal from "../modals/UserEditModal";
import { useState } from "react";
import DropdownButton, { IDropdownItem } from "../buttons/DropdownButton";
import { OptionsIcon } from "../Icons";

interface Props {
  user: IUserApi;
  setUser: (user: IUserApi) => void;
  refetch: () => void;
}

const SETTINGS_MENU: IDropdownItem[] = [
  {
    value: "edit",
    title: "Edit profile",
  },
];

const UserProfileBox = ({ user, setUser, refetch }: Props) => {
  const authStore = useAuthStore();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const isMyself = user.id === authStore.state.user.id;

  const handleFollow = async () => {
    if (user) {
      const response = await api.user.follow(user?.id);
      const { id } = await response.json();
      setUser({
        ...user,
        following_id: id,
      });
      authStore.increase("stats_following");
    }
  };

  const handleUnfollow = async () => {
    if (user?.id && user.following_id) {
      await api.user.unfollow(user?.id, user.following_id);
      setUser({
        ...user,
        following_id: undefined,
      });
      authStore.decrease("stats_following");
    }
  };

  const handleEditModalClose = async () => {
    if (isMyself) {
      refetch();
    }
    setEditModalOpen(false);
  };

  const handleSettingMenuClicked = (menu: IDropdownItem) => {
    if (menu.value === "edit") {
      setEditModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex gap-4 outline outline-neutral-700  rounded p-4 mb-1 justify-between ">
        <div>
          <Avatar user={user} size={20} />
        </div>
        <div className="flex-grow ">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <div className="text-neutral-600 font-semibold">@{user.username}</div>
          {user.bio && (
            <div className="pt-1 text-sm text-neutral-700">{user.bio}</div>
          )}
        </div>
        <div>
          {!isMyself && user.following_id && (
            <Button onClick={handleUnfollow} variant="secondary">
              Unfollow
            </Button>
          )}
          {!isMyself && !user.following_id && (
            <Button onClick={handleFollow}>Follow</Button>
          )}
          {isMyself && (
            <DropdownButton
              icon={<OptionsIcon size={18} />}
              buttonText="Options"
              items={SETTINGS_MENU}
              onSelect={handleSettingMenuClicked}
            ></DropdownButton>
          )}
        </div>
      </div>
      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        user={user}
      />
    </>
  );
};

export default UserProfileBox;
