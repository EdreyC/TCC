import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { task } from "./ModelTask";

export type project = {
  id: string;
  name: string;
  // description: string;
  users: string[];
  owner: string;
  tasks: task
};
