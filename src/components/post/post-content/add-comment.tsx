import { Field, Form, Formik } from "formik";
import { Textarea } from "~/components/ui/textarea";
import EmojiPicker from "~/components/ui/emoji-picker";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ChangeEvent } from "react";
import useAddComment from "~/hooks/post/use-add-comment";
import useEmojiPicker from "~/hooks/use-emoji-picker";

const AddComment = () => {
  const { addComment, commentContent, setCommentContent } = useAddComment();
  const { handleEmojiSelect } = useEmojiPicker();

  const initialValues = {
    content: "",
  };
  const validationSchema = z.object({
    content: z.string().min(1).max(2200),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={addComment}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ submitForm }) => (
        <Form className="relative flex w-full items-center gap-4 p-3.5">
          <EmojiPicker
            className=" translate-x-[-2%] translate-y-[-60%]"
            handleEmojiSelect={(emojiData) =>
              handleEmojiSelect({
                textToAppendEmoji: commentContent,
                setTextToAppendEmoji: setCommentContent,
                emojiData,
              })
            }
          />

          <Field
            as={Textarea}
            spellCheck={false}
            name="content"
            value={commentContent}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setCommentContent(e.currentTarget.value)
            }
            maxLength={2200}
            placeholder="Add a comment"
            className="h-10 max-h-14 w-[75%] resize-none rounded-none border-transparent px-0 pr-5 text-sm outline-none placeholder:text-slate-400 focus:ring-0 focus:ring-transparent focus:ring-offset-0"
          />
          <button
            onClick={submitForm}
            disabled={commentContent.length === 0}
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
