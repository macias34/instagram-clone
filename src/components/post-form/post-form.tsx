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
import usePostForm, { ImageData } from "./use-post-form";
import { postSchema } from "./schemas/post-schema";
import { Post } from "@prisma/client";
import PostFormHeader from "./post-form-header/post-form-header";
import PostFormStep from "./post-form-steps/post-form-step";
import { PostFormContext } from "contexts/post-form-context";

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

  const submitPostForm = async (post: PostFormValues) => {
    setIsShareButtonDisabled(true);
    await onSubmit({ images, caption: post.caption }).catch(() =>
      setIsShareButtonDisabled(false)
    );
  };

  const initialValues: PostFormValues = {
    images,
    caption: post?.caption ? post.caption : "",
  };

  const postFormContextValues = {
    setDialogOpened,
    setImages,
    images,
    view,
    setView,
    post,
    isShareButtonDisabled,
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
            <PostFormContext.Provider value={postFormContextValues}>
              <Form>
                <PostFormHeader
                  submitForm={submitForm}
                  dialogLabel={dialogLabel}
                />
                <PostFormStep />
              </Form>
            </PostFormContext.Provider>
          );
        }}
      </Formik>
    </AlertDialogContent>
  );
};

export default PostForm;
