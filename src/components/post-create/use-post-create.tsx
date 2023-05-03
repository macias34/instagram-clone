import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/utils/api";
import { ImageData } from "../post-form/use-post-form";
import { file2Base64 } from "~/utils/files";

const usePostCreate = () => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: upload } = api.post.createPost.useMutation();

  const createPost = async (post: { images: ImageData[]; caption: string }) => {
    return await upload(
      {
        images: await Promise.all(
          post.images.map(async (image) => {
            return {
              src: image.file ? await file2Base64(image.file) : image.src,
              name: image.name,
            };
          })
        ),
        caption: post.caption,
      },
      {
        onSuccess(post) {
          setIsDialogOpened(false);
          router.push("/p/" + post.id);
          toast({
            title: "Successfully created the post!",
            duration: 3000,
          });
        },
        onError(error) {
          toast({
            title: "Something went wrong while adding the post.",
            description: error.message,
            duration: 3000,
            variant: "destructive",
          });
        },
      }
    );
  };

  return {
    createPost,
    isDialogOpened,
    setIsDialogOpened,
  };
};

export default usePostCreate;
