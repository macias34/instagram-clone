import Head from "next/head";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { FC, PropsWithChildren, useState } from "react";
import Navbar from "./navbar/navbar";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();
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
        <Navbar />
        <div className="grow">{children}</div>
      </main>
    </>
  );
};

export default RootLayout;