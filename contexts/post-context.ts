import { createContext } from "react";
import { RouterOutputs } from "~/utils/api";

export interface PostContextValues {
  post: RouterOutputs["post"]["getPostById"];
  refetch: () => void;
}

export const PostContext = createContext<PostContextValues | null>(null);
