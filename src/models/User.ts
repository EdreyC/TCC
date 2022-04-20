import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export type user = {
  uid: string;
  name: string;
  displayName: string;
};

export async function addData(){

  const name = "meunome"

  await setDoc(doc(db, "users"), {
    uid: "uid",
    name: name,
    displayName: "displayName"
  });
} 