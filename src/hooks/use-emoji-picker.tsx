import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

export interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

interface HandleEmojiSelect {
  textToAppendEmoji: string;
  setTextToAppendEmoji: Dispatch<SetStateAction<string>>;
  emojiData: EmojiData;
}

const fetchEmojis = async () => {
  const res = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
  return res.json();
};

const useEmojiPicker = () => {
  const { data: emojis } = useQuery(["emojis"], fetchEmojis);

  const handleEmojiSelect = ({
    textToAppendEmoji,
    setTextToAppendEmoji,
    emojiData,
  }: HandleEmojiSelect) => {
    const { native } = emojiData;
    if (textToAppendEmoji.length <= 2198) {
      setTextToAppendEmoji((prevContent) => (prevContent += native));
    }
  };

  return {
    handleEmojiSelect,
    emojis,
  };
};

export default useEmojiPicker;
