import { Timestamp } from "firebase/firestore";

export type task = {
  name?: string | undefined;
  priority?: string;
  description?: string | undefined;
  comments: Comment[];
  date?: Timestamp;
  uid: string;
  tags: string[];
  userAssigned: string;
  status: string;
  project: string;
};


export type Comment={
  text: string;
  date: Timestamp;
  uid: string 
}
