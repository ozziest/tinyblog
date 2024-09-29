import { useParams } from "react-router-dom";
import PostContainer from "@/components/feeds/PostContainer";
import ShareInput from "@/components/feeds/ShareInput";
import Button from "@/components/inputs/Button";
import useUserFeedStore from "@/stores/userFeedStore";
import Feeds from "@/components/feeds/Feeds";

const ProfileView = () => {
  const store = useUserFeedStore();
  const { username } = useParams();

  return (
    <>
      <div className="bg-white sticky top-[44px] pt-4">
        <div className="flex gap-4 outline outline-neutral-900 rounded p-4 mb-1 justify-between">
          <div>
            {/* <Avatar src="https://i.pravatar.cc/300" size={20} /> */}
          </div>
          <div className="flex-grow ">
            <h1 className="font-bold text-2xl">Özgür Adem Işıklı</h1>
            <div className="text-neutral-600 font-semibold">@{username}</div>
            <div className="pt-1 text-sm text-neutral-700">
              Sr. software developer
            </div>
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
          <Feeds store={store} />
        </PostContainer>
      </div>
    </>
  );
};

export default ProfileView;
