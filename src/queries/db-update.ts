import { db } from "@/firebase";
import { DB_METHOD_STATUS } from "@/lib/config";
import { doc, DocumentData, updateDoc } from "firebase/firestore";

export const dbUpdateDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T
) => {
  try {
    const userRef = doc(db, collectionName, id);
    await updateDoc(userRef, data);
    return { status: DB_METHOD_STATUS.SUCCESS };
  } catch (e) {
    if (e instanceof Error) {
      return { status: DB_METHOD_STATUS.ERROR, message: e.message };
    }
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: "An unknown error occurred",
    };
  }
};


export const dbUpdateSubCollectionDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  subCollectionName: string,
  subCollectionID: string,
  data: T
) => {
  try {
    const userRef = doc(
      db,
      collectionName,
      id,
      subCollectionName,
      subCollectionID
    );
    await updateDoc(userRef, data);
    return { status: DB_METHOD_STATUS.SUCCESS };
  } catch (e) {
    if (e instanceof Error) {
      return { status: DB_METHOD_STATUS.ERROR, message: e.message };
    }
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: "An unknown error occurred",
    };
  }
};