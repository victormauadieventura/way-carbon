import { Comments } from "./comments";

export interface Comment {
  id?: number;
  comments?: Comments[] | null;
}