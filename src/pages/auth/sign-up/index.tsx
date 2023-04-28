import { Button } from "~/components/ui/button";
import { Formik, Form, ErrorMessage, Field } from "formik";
import LabeledField from "~/components/ui/labeled-field";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useToast } from "~/hooks/use-toast";
import { useRouter } from "next/router";
import Image from "next/image";

interface CredentialsAuth {
  username: string;
  password: string;
}

export const credentialsAuthValidationSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .min(3, "Username should be at least 3 characters.")
    .max(30, "Username should be max 30 characters."),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(3, "Password should be at least 3 characters."),
});

const AuthPage = () => {
  const { mutate, error } = api.auth.signUpWithCredentials.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const initialValues: CredentialsAuth = {
    username: "",
    password: "",
  };

  const onSubmit = async (values: CredentialsAuth) => {
    mutate(values, {
      onError(error, variables, context) {
        toast({
          title: "Something went wrong while trying to sign up!",
          description: error.message,
          variant: "destructive",
        });
      },
      async onSuccess(data, variables, context) {
        toast({
          title: "Success!",
          description: "You have succesfully signed up. You can sign in now.",
        });
        router.push("/auth");
      },
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

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={toFormikValidationSchema(
              credentialsAuthValidationSchema
            )}
          >
            <Form className="flex w-[260px] flex-col gap-2">
              <LabeledField
                name="username"
                placeholder="Phone number, username, or email"
              />
              <LabeledField
                name="password"
                type="password"
                placeholder="Password"
              />

              <Button className="mt-2" variant="accent" type="submit">
                Sign up
              </Button>
            </Form>
          </Formik>
        </div>
        <div className="flex flex-col items-center justify-center gap-5  border border-slate-300 px-10 py-5">
          <span className="text-sm">
            Have an account?{" "}
            <Link
              href="/auth"
              className="cursor-pointer font-semibold text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
