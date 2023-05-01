import { createContext } from "react";
import { RouterOutputs } from "~/utils/api";

interface PostContextValues {
  post: RouterOutputs["post"]["getPostById"];
  refetch: () => void;
}

export const PostContext = createContext<PostContextValues | null>(null);
