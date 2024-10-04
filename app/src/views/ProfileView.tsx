import { useNavigate, useParams } from "react-router-dom";
import PostContainer from "@/components/posts/PostContainer";
import ShareInput from "@/components/posts/ShareInput";
import Button from "@/components/inputs/Button";
import Posts from "@/components/posts/Posts";
import { useProfilePostsStore } from "@/stores/postStore";
import { useEffect, useState } from "react";
import api from "@/api";
import Avatar from "@/components/user/Avatar";
import { IUserApi } from "@/types/ApiTypes";

const ProfileView = () => {
  const store = useProfilePostsStore();
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState<IUserApi>();

  const fetch = async () => {
    if (!username) {
      return navigate("/");
    }

    const { data } = await api.user.findByUsername(username);
    if (data.length === 0) {
      return navigate("/404");
    }

    setUser(data[0]);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!user) {
    return;
  }

  return (
    <>
      <div className="bg-white sticky top-[44px] pt-4">
        <div className="flex gap-4 outline outline-neutral-700  rounded p-4 mb-1 justify-between">
          <div>
            <Avatar user={user} size={20} />
          </div>
          <div className="flex-grow ">
            <h1 className="font-bold text-2xl">{user.name}</h1>
            <div className="text-neutral-600 font-semibold">@{username}</div>
            {user.bio && (
              <div className="pt-1 text-sm text-neutral-700">{user.bio}</div>
            )}
          </div>
          <div>
            <Button>Follow</Button>
          </div>
        </div>
        <PostContainer>
          <ShareInput store={store} />
        </PostContainer>
      </div>
      <div className="">
        <PostContainer>
          <Posts store={store} />
        </PostContainer>
      </div>
    </>
  );
};

export default ProfileView;
