import Link from "next/link";
import NavbarHomeIcon from "../assets/navbar-home-icon";
import Search from "~/components/home/search/search";
import Avatar from "~/components/ui/avatar";
import { useSession } from "next-auth/react";
import PostCreate from "~/components/post-create/post-create";
import NavbarAuthButton from "./navbar-auth-button/navbar-auth-button";

const NavbarItems = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex flex-row items-center justify-around xl:flex-col xl:gap-4">
      <Link
        title="Home page"
        href="/"
        className="flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:w-full xl:pl-2"
      >
        <NavbarHomeIcon />
        <span className="hidden xl:inline">Home</span>
      </Link>

      <Search />

      {sessionData && <PostCreate />}

      {sessionData && (
        <Link
          title="Profile page"
          href={`/${sessionData.user.name}`}
          className="flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:w-full xl:pl-2"
        >
          <Avatar user={sessionData.user} />

          <span className="hidden xl:inline">Profile</span>
        </Link>
      )}
      <NavbarAuthButton />
    </nav>
  );
};

export default NavbarItems;
