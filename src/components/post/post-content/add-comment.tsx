import { Field, Form, Formik } from "formik";
import { Textarea } from "~/components/ui/textarea";
import EmojiPicker, { EmojiData } from "~/components/ui/emoji-picker";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "~/utils/api";
import { PostProps } from "../post-content";
import { ChangeEvent, useState } from "react";
import { useToast } from "~/hooks/use-toast";

const AddComment = ({ post, refetch }: PostProps) => {
  const { toast } = useToast();
  const { mutate: comment } = api.comment.commentPostById.useMutation();
  const [content, setContent] = useState("");

  const initialValues = {
    content: "",
  };

  const onAddComment = () => {
    setContent("");
    comment(
      { id: post.id, content },
      {
        onSettled() {
          refetch();
        },
        onError(error) {
          toast({
            title: "Something went wrong while adding the comment.",
            description: error.message,
            duration: 3000,
            variant: "destructive",
          });
        },
      }
    );
  };

  const validationSchema = z.object({
    content: z.string().min(1).max(2200),
  });

  const handleEmojiSelect = (emojiData: EmojiData) => {
    const { native } = emojiData;
    if (content.length <= 2198) {
      setContent((prevContent) => (prevContent += native));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onAddComment}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ submitForm }) => (
        <Form className="relative flex w-full items-center gap-4 p-3.5">
          <EmojiPicker
            className=" translate-x-[-2%] translate-y-[-60%]"
            handleEmojiSelect={handleEmojiSelect}
          />

          <Field
            as={Textarea}
            spellCheck={false}
            name="content"
            value={content}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setContent(e.currentTarget.value)
            }
            maxLength={2200}
            placeholder="Add a comment"
            className="h-10 max-h-14 w-[75%] resize-none rounded-none border-transparent px-0 pr-5 text-sm outline-none placeholder:text-slate-400 focus:ring-0 focus:ring-transparent focus:ring-offset-0"
          />
          <button
            onClick={submitForm}
            disabled={content.length === 0}
            className="bg-transparent font-semibold text-blue-600 hover:text-slate-800 disabled:text-blue-300"
          >
            Post
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddComment;
