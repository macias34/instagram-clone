import { Separator } from "../ui/seperator";
import ImagesUploadStep from "./steps/images-upload";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import PostContentStep from "./steps/post-content";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import DiscardPost from "./discard-post";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { file2Base64 } from "~/utils/files";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export interface ImageData {
  name: string;
  file: File;
  previewURL: string;
}

const Creator = ({
  setCreatorOpened,
}: {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [view, setView] = useState<"images-upload" | "post-content">(
    "images-upload"
  );
  const [images, setImages] = useState<ImageData[]>([]);
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { mutate: upload } = api.post.createPost.useMutation();

  useEffect(() => {
    if (images && images.length > 0) setView("post-content");
  }, [images]);

  useEffect(() => {
    return () => {
      if (images && images.length > 0) {
        images.map((image) => URL.revokeObjectURL(image.previewURL));
      }
    };
  }, [images]);

  const createPostSchema = z.object({
    images: z
      .custom<File>()
      .array()
      .min(0, "No images were selected. You need to select at least one image.")
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
    images: [],
    caption: "",
  };

  const onCreatePost = async (post: {
    images: ImageData[];
    caption: string;
  }) => {
    upload(
      {
        images: await Promise.all(
          images.map(async (image) => {
            return {
              file: await file2Base64(image.file),
              name: image.name,
            };
          })
        ),
        caption: post.caption,
      },
      {
        onSuccess(post, variables) {
          setCreatorOpened(false);
          router.push("/" + sessionData?.user.name);
        },
      }
    );
  };

  return (
    <AlertDialogContent
      className={`gap-0 px-0 py-0 pt-4 transition-all duration-300 ${
        view === "images-upload" ? "max-w-lg" : "max-w-4xl"
      }`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createPostSchema)}
        onSubmit={onCreatePost}
      >
        {({ submitForm }) => (
          <Form>
            <AlertDialogHeader className="relative flex w-full items-center">
              <div
                className={`flex w-full flex-row items-center justify-between px-3
             `}
              >
                <DiscardPost setCreatorOpened={setCreatorOpened} />
                <AlertDialogTitle className="absolute left-1/2 top-0 -translate-x-1/2 text-base">
                  Create new post
                </AlertDialogTitle>

                {view === "post-content" && (
                  <button
                    type="button"
                    onClick={submitForm}
                    className="cursor-pointer font-semibold text-blue-500 transition hover:text-blue-800"
                  >
                    Share
                  </button>
                )}
              </div>
              <Separator className="" />
            </AlertDialogHeader>

            <div className="flex h-[530px] flex-col items-center justify-center gap-7 rounded-md">
              {view === "images-upload" && (
                <ImagesUploadStep setImages={setImages} />
              )}
              {view === "post-content" && <PostContentStep images={images} />}
            </div>
          </Form>
        )}
      </Formik>
    </AlertDialogContent>
  );
};

export default Creator;
