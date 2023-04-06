import { Button } from "~/components/ui/button";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { z } from "zod";
import { api } from "~/utils/api";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/use-toast";
import { Input } from "~/components/ui/input";
import Image from "next/image";

interface CredentialsAuth {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const initialValues: CredentialsAuth = {
    username: "",
    password: "",
  };

  const onSubmit = async (values: CredentialsAuth) => {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    }).then((res) => {
      if (!res) return null;

      if (res.ok) router.push("/");
      else
        toast({
          title: "Something went wrong!",
          description: res.error,
          variant: "destructive",
        });
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex w-[350px] flex-col gap-3">
        <div className="flex w-full flex-col items-center justify-center gap-5 border border-slate-300 py-5">
          <Image
            width="175"
            height="55"
            alt="Instagram logo"
            src={
              "https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
            }
          />

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="flex w-[260px] flex-col gap-2">
              <Field
                as={Input}
                name="username"
                placeholder="Phone number, username, or email"
              />
              <Field
                as={Input}
                name="password"
                type="password"
                placeholder="Password"
              />

              <Button className="mt-2" variant="accent" type="submit">
                Log in
              </Button>
            </Form>
          </Formik>
        </div>
        <div className="flex flex-col items-center justify-center gap-5  border border-slate-300 px-10 py-5">
          <span className="text-sm">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="cursor-pointer font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  return <LoginForm />;
};

export default AuthPage;
