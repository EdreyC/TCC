import { Timestamp } from "firebase/firestore";

export type task = {
  id: string;
  name: string;
  priority: string;
  description: string;
  comments: { text: string; date: Timestamp; uid: string }[];
  date: Timestamp;
  uid: string;
  tags: string[];
  userAssigned: string;
  status: string;
  project: string;
};

