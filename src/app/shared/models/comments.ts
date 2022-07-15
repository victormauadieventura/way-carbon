export interface Comments {
  id?: number;
  respondsTo?: {
    id: number;
  };
  author?: number;
  username?: string;
  timestamp?: string;
  content?: string;
  children?: Comments[];
}