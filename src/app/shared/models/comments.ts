export interface Comments {
  id?: number;
  respondsTo?: {
    id: number;
  };
  author?: number | string;
  timestamp?: string;
  content?: string;
  children?: Comments[];
}