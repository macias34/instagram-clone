import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

export interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

const EmojiPicker = ({
  handleEmojiSelect,
  className,
}: {
  handleEmojiSelect: (emojiData: EmojiData) => void;
  className: string;
}) => {
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  return (
    <>
      <button
        onClick={() => setEmojiPickerOpened((prevState) => !prevState)}
        type="button"
        className="relative"
      >
        <svg
          aria-label="Emoji"
          color="rgb(115, 115, 115)"
          fill="rgb(115, 115, 115)"
          height="20"
          role="img"
          viewBox="0 0 24 24"
          width="20"
        >
          <title>Emoji</title>
          <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
        </svg>
      </button>
      {emojiPickerOpened && (
        <div className={`absolute ${className}`}>
          <Picker
            theme="light"
            data={data}
            autoFocus={true}
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      )}
    </>
  );
};

export default EmojiPicker;
