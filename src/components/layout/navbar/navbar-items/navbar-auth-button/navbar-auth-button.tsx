import { LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const NavbarAuthButton = () => {
  const { data: sessionData } = useSession();
  return (
    <button
      title={sessionData ? "Log out" : "Log in"}
      onClick={() => (sessionData ? signOut() : signIn())}
      className="static bottom-0 flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:absolute xl:w-full xl:pl-2"
    >
      <LogOut />{" "}
      <span className="hidden xl:inline">
        {sessionData ? "Log out" : "Log in"}
      </span>
    </button>
  );
};

export default NavbarAuthButton;
