import { Dispatch, SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import { file2Base64 } from "~/utils/files";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/use-toast";
import PostForm from "../post-form/post-form";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";

export interface ImageData {
  name: string;
  file?: File;
  src: string;
}

const PostCreate = () => {
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);

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
          setCreatorOpened(false);
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

  return (
    <AlertDialog open={creatorOpened}>
      <AlertDialogTrigger onClick={() => setCreatorOpened(true)} asChild>
        <button
          title="Open post creation"
          className="flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:w-full xl:pl-2"
        >
          <svg
            aria-label="Nowy post"
            color="rgb(0, 0, 0)"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="6.545"
              x2="17.455"
              y1="12.001"
              y2="12.001"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="12.003"
              x2="12.003"
              y1="6.545"
              y2="17.455"
            ></line>
          </svg>
          <span className="hidden xl:inline">Create</span>
        </button>
      </AlertDialogTrigger>
      {creatorOpened && (
        <PostForm onSubmit={createPost} setDialogOpened={setCreatorOpened} />
      )}
    </AlertDialog>
  );
};

export default PostCreate;
