import { Separator } from "../ui/seperator";
ImagesUploadStep;
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import PostContentStep from "../post-creator/steps/post-content";
import DiscardPost from "../post-creator/discard-post";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { file2Base64 } from "~/utils/files";
import { useRouter } from "next/router";
import { useToast } from "~/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import ImagesUploadStep from "../post-creator/steps/images-upload";
import { PostProps } from "./post-content";

export interface ImageData {
  name: string;
  file?: File;
  src: string;
}

interface PostEditor {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
  post: PostProps["post"];
}

const PostEditor = ({ post: fetchedPost, setCreatorOpened }: PostEditor) => {
  const router = useRouter();
  const { mutate: upload } = api.post.editPost.useMutation();
  const { toast } = useToast();
  const [view, setView] = useState<"images-upload" | "post-content">(
    "post-content"
  );
  const [images, setImages] = useState<ImageData[]>(
    fetchedPost.images.map((image) => image)
  );
  const [isShareButtonDisabled, setIsShareButtonDisabled] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) setView("post-content");
    else setView("images-upload");
  }, [images]);

  const createPostSchema = z.object({
    images: z
      .custom<File>()
      .array()
      .min(1, "No images were selected. You need to select at least one image.")
      .max(
        10,
        "Too many images selected. You can select up to 10 images per post."
      )
      .refine(
        (images) =>
          images.every((image) => image.name.match(/\.(jpg|jpeg|png|gif)$/i)),
        "Not supported image format. Images must be jpg, jpeg, png or gif."
      ),
    caption: z
      .string()
      .max(2200, "The caption must be 2200 characters max.")
      .optional(),
  });

  const initialValues = {
    images,
    caption: fetchedPost?.caption ? fetchedPost.caption : "",
  };

  const onCreatePost = async (post: {
    images: ImageData[];
    caption: string;
  }) => {
    setIsShareButtonDisabled(true);
    upload(
      {
        postId: fetchedPost.id,
        images: await Promise.all(
          images.map(async (image) => {
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
          setCreatorOpened(false);
          router.push("/p/" + fetchedPost.id);
          toast({
            title: "Successfully edited the post!",
            duration: 3000,
          });
        },
        onError(error) {
          setIsShareButtonDisabled(false);
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
    <AlertDialogContent
      className={`gap-0 px-0 py-0 pt-4 transition-all duration-300 max-xl:top-1/2 max-xl:max-w-sm max-xl:-translate-y-1/2 max-xl:rounded-lg ${
        view === "images-upload" ? "max-w-lg" : "max-w-4xl"
      }`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createPostSchema)}
        onSubmit={onCreatePost}
      >
        {({ submitForm }) => {
          return (
            <Form>
              <AlertDialogHeader className="relative flex w-full items-center">
                <div
                  className={`flex w-full flex-row items-center justify-between px-3
             `}
                >
                  {view === "images-upload" ? (
                    <DiscardPost
                      images={images}
                      setCreatorOpened={setCreatorOpened}
                    />
                  ) : (
                    <button
                      onClick={() => setView("images-upload")}
                      type="button"
                      title="Image upload"
                      className="cursor-pointer"
                    >
                      <ArrowLeft />
                    </button>
                  )}

                  <AlertDialogTitle className="absolute left-1/2 top-0 -translate-x-1/2 text-base">
                    Edit post
                  </AlertDialogTitle>

                  {view === "images-upload" && images.length > 0 && (
                    <button
                      className="cursor-pointer font-semibold text-blue-500 transition hover:text-blue-800"
                      onClick={() => setView("post-content")}
                    >
                      Content
                    </button>
                  )}

                  {view === "post-content" && (
                    <button
                      type="button"
                      onClick={submitForm}
                      disabled={isShareButtonDisabled}
                      className="cursor-pointer font-semibold text-blue-500 transition hover:text-blue-800"
                    >
                      Share
                    </button>
                  )}
                </div>
                <Separator className="" />
              </AlertDialogHeader>

              <div className="flex min-h-[500px] flex-col items-center justify-center gap-7 rounded-md xl:h-[530px]">
                {view === "images-upload" && (
                  <ImagesUploadStep setImages={setImages} />
                )}
                {view === "post-content" && (
                  <PostContentStep
                    setImages={setImages}
                    post={fetchedPost}
                    images={images}
                  />
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </AlertDialogContent>
  );
};

export default PostEditor;
