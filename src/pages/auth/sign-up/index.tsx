import { Button } from "~/components/ui/button";
import { Formik, Form } from "formik";
import LabeledField from "~/components/ui/labeled-field";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import Link from "next/link";

import Image from "next/image";
import { CredentialsAuth } from "~/components/pages/auth/sign-in/use-sign-in-page";
import useSignUpPage from "~/components/pages/auth/sign-up/use-sign-up-page";

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
  const { signUp } = useSignUpPage();

  const initialValues: CredentialsAuth = {
    username: "",
    password: "",
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
            onSubmit={signUp}
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
