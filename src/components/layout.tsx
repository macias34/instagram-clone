import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { Session } from "next-auth";
import Image from "next/image";
import { FC, PropsWithChildren, useState } from "react";
import Avatar from "./ui/avatar";
import Search from "./home/search/search";
import { LogOut } from "lucide-react";
import PostCreate from "./post-create/post-create";

const Navbar: React.FC<{ sessionData: Session | null }> = ({ sessionData }) => {
  return (
    <div className="sticky top-0 z-50 flex w-full flex-col justify-between border-b border-slate-300 bg-white px-4 py-3  xl:h-screen xl:w-1/6 xl:border-b-0 xl:border-r xl:py-7 ">
      <div className="relative z-50 flex h-full w-full flex-col justify-between ">
        <div className="flex flex-col gap-5">
          <div className="hidden xl:block">
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
          <nav className="flex flex-row items-center justify-around xl:flex-col xl:gap-4">
            <Link
              title="Home page"
              href="/"
              className="flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:w-full xl:pl-2"
            >
              <svg
                color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
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
          </nav>
        </div>
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

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col xl:flex-row">
        <Navbar sessionData={sessionData} />
        <div className="grow">{children}</div>
      </main>
    </>
  );
};

export default RootLayout;
