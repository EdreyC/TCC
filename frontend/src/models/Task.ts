import { Timestamp } from "firebase/firestore";

export type task = {
  name?: string | undefined;
  priority?: string;
  description?: string | undefined;
  comments: comment[];
  date?: Timestamp;
  uid: string;
  tags: string[];
  userAssigned: string;
  status: string;
  project: string;
};

export type postTask = {
  uid: string;
  name?: string;
  priority: string;
  description?: string;
  comments?: [];
  status?: string;
  project?: string;
};

export type comment = {
  text: string;
  date: Timestamp;
  uid: string
}
