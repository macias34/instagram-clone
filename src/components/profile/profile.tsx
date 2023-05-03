import { Separator } from "@radix-ui/react-menubar";
import { FunctionComponent } from "react";
import { RouterOutputs } from "~/utils/api";
import ProfileHeader from "./profile-header/profile-header";
import ProfileFeed from "./profile-feed/profile-feed";

interface ProfileProps {
  userData: RouterOutputs["user"]["getUserPublicDataByUsername"];
  posts: RouterOutputs["post"]["getPostsByUsername"];
  refetch: () => void;
}

const Profile: FunctionComponent<ProfileProps> = ({
  userData,
  posts,
  refetch,
}) => {
  return (
    <div className="flex h-full flex-col gap-10 py-10 xl:gap-14 xl:px-40">
      {userData && <ProfileHeader userData={userData} refetch={refetch} />}
      <Separator />
      {posts && <ProfileFeed posts={posts} />}
    </div>
  );
};

export default Profile;
