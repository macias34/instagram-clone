import { createContext } from "react";
import { ImageData } from "~/components/post-form/use-post-form";
import { Dispatch, SetStateAction } from "react";
import { PostContextValues } from "./post-context";

export interface PostFormContextValues {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  view: "images-upload" | "post-content";
  setView: Dispatch<SetStateAction<"images-upload" | "post-content">>;
  isShareButtonDisabled: boolean;
  post?: PostContextValues["post"];
  setDialogOpened: Dispatch<SetStateAction<boolean>>;
}

export const PostFormContext = createContext<PostFormContextValues | null>(
  null
);
