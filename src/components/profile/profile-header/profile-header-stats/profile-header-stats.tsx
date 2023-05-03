import { FunctionComponent } from "react";
import { ProfileHeaderProps } from "../profile-header";

interface ProfileHeaderStatsProps {
  userData: ProfileHeaderProps["userData"];
  showDialog: (mode: "followers" | "followings") => void;
}

const ProfileHeaderStats: FunctionComponent<ProfileHeaderStatsProps> = ({
  userData,
  showDialog,
}) => {
  return (
    <div className="flex items-center gap-10">
      <span className="text-base">
        <span className="font-semibold">{userData.posts.length}</span>{" "}
        {userData.posts.length !== 1 ? "posts" : "post"}
      </span>
      <span
        onClick={() => showDialog("followers")}
        className="cursor-pointer text-base"
      >
        <span className="font-semibold">{userData.followers.length}</span>{" "}
        {userData.followers.length !== 1 ? "followers" : "follower"}
      </span>
      <span
        onClick={() => showDialog("followings")}
        className="cursor-pointer text-base"
      >
        <span className="font-semibold">{userData.followings.length}</span>{" "}
        {userData.followers.length !== 1 ? "followings" : "following"}
      </span>
    </div>
  );
};

export default ProfileHeaderStats;
