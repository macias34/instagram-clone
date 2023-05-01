import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { Textarea } from "~/components/ui/textarea";
import { Field } from "formik";
import { ImageData } from "../creator";
import Avatar from "~/components/profile/avatar";
import EmojiPicker from "~/components/ui/emoji-picker";
import PreviewImages from "./post-content/preview-images";
import { PostProps } from "~/components/post/post-content";
import useEmojiPicker from "~/hooks/use-emoji-picker";

export interface PostContentStep {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  post?: PostProps["post"];
}

const PostContentStep = ({ images, setImages, post }: PostContentStep) => {
  const { data: sessionData } = useSession();
  if (!sessionData) return <p>Something went wrong with session.</p>;

  const [caption, setCaption] = useState(post?.caption ? post.caption : "");
  const { handleEmojiSelect } = useEmojiPicker();

  if (images && images.length > 0)
    return (
      <div className="flex h-full w-full flex-col xl:flex-row">
        <PreviewImages setImages={setImages} images={images} />
        <div className="flex h-full grow flex-col gap-4 pt-4">
          <div className="flex h-fit items-center gap-3 pl-4">
            <Avatar user={sessionData.user} />
            <span className="text-sm font-semibold">
              {sessionData?.user.name}
            </span>
          </div>

          <div className="relative flex h-56 flex-col justify-between border-b border-b-slate-300 pl-4">
            <Field
              as={Textarea}
              spellCheck={false}
              name="caption"
              maxLength={2200}
              value={caption}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setCaption(e.currentTarget.value)
              }
              placeholder="Write a caption"
              className="h-5/6 resize-none rounded-none  border-transparent px-0 pr-5 text-base outline-none placeholder:text-slate-400 focus:ring-0 focus:ring-transparent focus:ring-offset-0"
            />

            <div className="flex justify-between py-4 pr-4 text-xs text-slate-400">
              <EmojiPicker
                className=" -translate-x-[110%] translate-y-[-75%]"
                handleEmojiSelect={(emojiData) =>
                  handleEmojiSelect({
                    textToAppendEmoji: caption,
                    setTextToAppendEmoji: setCaption,
                    emojiData,
                  })
                }
              />

              <span>{caption.length}/2,200</span>
            </div>
          </div>
        </div>
      </div>
    );

  return <div />;
};

export default PostContentStep;
