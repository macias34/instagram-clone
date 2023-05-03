import { FunctionComponent, useContext } from "react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import PostFormDiscard from "../post-form-discard/post-form-discard";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@radix-ui/react-menubar";
import { PostFormContext } from "contexts/post-form-context";

interface PostFormHeaderProps {
  dialogLabel: string;
  submitForm: (() => Promise<void>) & (() => Promise<any>);
}

const PostFormHeader: FunctionComponent<PostFormHeaderProps> = ({
  dialogLabel,
  submitForm,
}) => {
  const { setDialogOpened, isShareButtonDisabled, images, view, setView } =
    useContext(PostFormContext)!;

  return (
    <AlertDialogHeader className="relative flex w-full items-center">
      <div
        className={`flex w-full flex-row items-center justify-between px-3
             `}
      >
        {view === "images-upload" ? (
          <PostFormDiscard images={images} setCreatorOpened={setDialogOpened} />
        ) : (
          <button
            onClick={() => setView("images-upload")}
            type="button"
            title="Image upload"
            className="cursor-pointer"
          >
            <ArrowLeft />
          </button>
        )}

        <AlertDialogTitle className="absolute left-1/2 top-0 -translate-x-1/2 text-base">
          {dialogLabel}
        </AlertDialogTitle>

        {view === "images-upload" && images.length > 0 && (
          <button
            className="cursor-pointer font-semibold text-blue-500 transition hover:text-blue-800"
            onClick={() => setView("post-content")}
          >
            Content
          </button>
        )}

        {view === "post-content" && (
          <button
            type="button"
            onClick={submitForm}
            disabled={isShareButtonDisabled}
            className="cursor-pointer font-semibold text-blue-500 transition hover:text-blue-800"
          >
            Share
          </button>
        )}
      </div>
      <Separator className="" />
    </AlertDialogHeader>
  );
};

export default PostFormHeader;
