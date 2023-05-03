import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

export interface ListDialogValues {
  isDialogOpened: boolean;
  setIsDialogOpened: Dispatch<SetStateAction<boolean>>;
}

export const ListDialogContext = createContext<ListDialogValues | null>(null);
