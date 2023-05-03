import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/use-toast";

export interface CredentialsAuth {
  username: string;
  password: string;
}

const useSignInPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const signIn_ = async (values: CredentialsAuth) => {
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

  return {
    signIn_,
  };
};

export default useSignInPage;
