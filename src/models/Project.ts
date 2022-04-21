import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export type project = {
  id: string;
  name: string;
  description: string;
  users: string[];
  owner: string;
};