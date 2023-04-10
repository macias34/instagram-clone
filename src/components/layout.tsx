import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { Session } from "next-auth";
import Image from "next/image";
import { BiLogOut, BiHomeAlt } from "react-icons/bi";
import PostCreatorDialog from "~/components/post-creator/post-creator-dialog";
import { FC, PropsWithChildren } from "react";

const Aside: React.FC<{ sessionData: Session | null }> = ({ sessionData }) => {
  if (!sessionData)
    return (
      <div className="flex flex-col justify-between border-r border-slate-300 py-7 pl-5 pr-4">
        <div className="flex flex-col gap-5">
          <Image
            priority
            width="100"
            height="29"
            alt="Instagram logo"
            src={
              "https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
            }
          />
        </div>
        <div
          title="Log in"
          onClick={() => signIn()}
          className="flex cursor-pointer items-center gap-3 rounded-full py-2 pl-2 pr-28 text-base hover:bg-slate-50"
        >
          <BiLogOut className="text-3xl" /> Log in
        </div>
      </div>
    );

  const { user } = sessionData;

  return (
    <div className="flex flex-col justify-between border-r border-slate-300 py-7 pl-5 pr-4">
      <div className="flex flex-col gap-5">
        <Image
          priority
          width="100"
          height="29"
          alt="Instagram logo"
          src={
            "https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
          }
        />

        <nav className="flex flex-col gap-4">
          <Link
            title="Home page"
            href="/"
            className="flex items-center gap-3 rounded-full py-2 pl-2 pr-28 text-base hover:bg-slate-50"
          >
            <BiHomeAlt className="text-3xl" /> Home
          </Link>

          <PostCreatorDialog />

          <Link
            title="Profile page"
            href={`/${user.name}`}
            className="flex cursor-pointer items-center gap-3 rounded-full py-2 pl-2 pr-28 text-base hover:bg-slate-50"
          >
            <Image
              alt={`${user.name}'s image picture`}
              src={
                user.image
                  ? user.image
                  : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              }
              width="30"
              height="30"
              className="rounded-full border-2 border-slate-300"
            />
            Profile
          </Link>
        </nav>
      </div>
      <div
        title="Log out"
        onClick={() => signOut()}
        className="flex cursor-pointer items-center gap-3 rounded-full py-2 pl-2 pr-28 text-base hover:bg-slate-50"
      >
        <BiLogOut className="text-3xl" /> Log out
      </div>
    </div>
  );
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: sessionData, status } = useSession();
  if (status === "loading")
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  // if (!sessionData) return <LoginForm />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <Aside sessionData={sessionData} />
        {children}
      </main>
    </>
  );
};

export default RootLayout;