import { useRouter } from "next/router";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/utils/api";
import { CredentialsAuth } from "../sign-in/use-sign-in-page";

const useSignUpPage = () => {
  const { mutate: createUserInDB } =
    api.auth.signUpWithCredentials.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const signUp = async (values: CredentialsAuth) => {
    createUserInDB(values, {
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

  return {
    signUp,
  };
};

export default useSignUpPage;
