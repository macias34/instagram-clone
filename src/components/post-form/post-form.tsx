import { useState, Dispatch, SetStateAction, FC } from "react";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ArrowLeft } from "lucide-react";
import { PostContextValues } from "contexts/post-context";
import PostFormDiscard from "./post-form-discard/post-form-discard";
import usePostForm, { ImageData } from "./use-post-form";
import { Separator } from "../ui/seperator";
import { postSchema } from "./schemas/post-schema";
import { Post } from "@prisma/client";
import PostFormStepImagesUpload from "./post-form-steps/post-form-step-images-upload/post-form-step-images-upload";
import PostFormStepContent from "./post-form-steps/post-form-step-content/post-form-step-content";

interface PostFormValues {
  images: ImageData[];
  caption: string;
}

interface PostFormProps {
  post?: PostContextValues["post"];
  onSubmit: (values: PostFormValues) => Promise<Post>;
  setDialogOpened: Dispatch<SetStateAction<boolean>>;
  dialogLabel: string;
}

const PostForm: FC<PostFormProps> = ({
  post,
  onSubmit,
  setDialogOpened,
  dialogLabel,
}) => {
  const [images, setImages] = useState<ImageData[]>(
    post?.images ? post.images : []
  );
  const [isShareButtonDisabled, setIsShareButtonDisabled] = useState(false);

  const { view, setView } = usePostForm(images);

  const initialValues: PostFormValues = {
    images,
    caption: post?.caption ? post.caption : "",
  };

  const submitPostForm = async (post: PostFormValues) => {
    setIsShareButtonDisabled(true);
    await onSubmit({ images, caption: post.caption }).catch(() =>
      setIsShareButtonDisabled(false)
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
        validationSchema={toFormikValidationSchema(postSchema)}
        onSubmit={submitPostForm}
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
                    <PostFormDiscard
                      images={images}
                      setCreatorOpened={setDialogOpened}
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
                    {dialogLabel}
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
                  <PostFormStepImagesUpload setImages={setImages} />
                )}
                {view === "post-content" && (
                  <PostFormStepContent
                    setImages={setImages}
                    post={post}
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

export default PostForm;
