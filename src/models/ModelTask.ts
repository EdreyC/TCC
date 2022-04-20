import { doc, setDoc, Timestamp} from "firebase/firestore";
import { db } from "../services/firebase";

export type task = {
  id: string;
  name: string;
  priority: string;
  description: string;
  comments: { user: string; text: string; date: Timestamp; uid: string }[];
  date: Timestamp;
  uid: string;
  tags: string[];
  userAssigned: string;
  status: string;
  project: string;
};

