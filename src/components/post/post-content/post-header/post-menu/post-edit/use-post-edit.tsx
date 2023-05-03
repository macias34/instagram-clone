import { PostContextValues } from "contexts/post-context";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/utils/api";
import { file2Base64 } from "~/utils/files";
import { useState } from "react";
import { ImageData } from "~/components/post-form/use-post-form";

const usePostEdit = (fetchedPost: PostContextValues["post"]) => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const router = useRouter();
  const { mutateAsync: upload } = api.post.editPost.useMutation();
  const { toast } = useToast();

  const editPost = async (post: { images: ImageData[]; caption: string }) => {
    return await upload(
      {
        postId: fetchedPost.id,
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
        onSuccess() {
          setIsDialogOpened(false);
          router.reload();
          toast({
            title: "Successfully edited the post!",
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
    editPost,
    isDialogOpened,
    setIsDialogOpened,
  };
};

export default usePostEdit;
