import { useParams } from "react-router-dom";
import FeedContainer from "../components/feeds/FeedContainer";
import Feeds from "../components/feeds/Feeds";
import ShareInput from "../components/feeds/ShareInput";
import { getFeeds } from "../fakes";
import Avatar from "../components/user/Avatar";
import Button from "../components/inputs/Button";

const UserView = () => {
  const { username } = useParams();
  const FAKE_ANSWERS = getFeeds().reverse();

  return (
    <>
      <div className="bg-white sticky top-[44px] pt-4">
        <div className="flex gap-4 outline outline-neutral-900 rounded p-4 mb-1 justify-between">
          <div>
            <Avatar src="https://i.pravatar.cc/300" size={20} />
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
        <FeedContainer>
          <ShareInput isReply />
        </FeedContainer>
      </div>
      <div className="">
        <FeedContainer>
          <Feeds posts={FAKE_ANSWERS} />
        </FeedContainer>
      </div>
    </>
  );
};

export default UserView;
