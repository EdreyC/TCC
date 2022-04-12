import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export type user = {
  uid: string;
  name: string;
  displayName: string;
};
