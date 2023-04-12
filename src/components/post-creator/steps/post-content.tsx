import { useState, ChangeEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Textarea } from "~/components/ui/textarea";
import { Field } from "formik";
import { ImageData } from "../creator";
import Avatar from "~/components/profile/avatar";
import EmojiPicker, { EmojiData } from "~/components/ui/emoji-picker";

const PreviewImages = ({ images }: { images: ImageData[] }) => {
  const [currentPreviewedImage, setCurrentPreviewedImage] = useState(0);

  return (
    <div className="relative w-3/5">
      {images.map((image, index) => (
        <Image
          key={image.previewURL}
          src={image.previewURL}
          priority
          alt="Preview image"
          style={{ objectFit: "cover" }}
          className={`${
            currentPreviewedImage !== index && "invisible"
          } rounded-bl-lg brightness-110`}
          fill
        />
      ))}

      {currentPreviewedImage < images.length - 1 && (
        <div
          onClick={() => setCurrentPreviewedImage((prevState) => prevState + 1)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronRight className="text-white" />
        </div>
      )}

      {currentPreviewedImage !== 0 && (
        <div
          onClick={() => setCurrentPreviewedImage((prevState) => prevState - 1)}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronLeft className="text-white" />
        </div>
      )}
    </div>
  );
};

const PostContentStep = ({ images }: { images: ImageData[] }) => {
  const { data: sessionData } = useSession();
  if (!sessionData) return <p>Something went wrong with session.</p>;

  const [caption, setCaption] = useState("");

  const handleEmojiSelect = (emojiData: EmojiData) => {
    const { native } = emojiData;
    if (caption.length <= 2198)
      setCaption((prevState) => (prevState += native));
  };

  if (images && images.length > 0)
    return (
      <div className="flex h-full w-full">
        <PreviewImages images={images} />
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
                className="-translate-x-[110%] translate-y-[-75%]"
                handleEmojiSelect={handleEmojiSelect}
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
