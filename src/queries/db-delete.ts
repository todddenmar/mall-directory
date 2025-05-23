import { db } from "@/firebase";
import { DB_METHOD_STATUS } from "@/lib/config";
import { deleteDoc, doc } from "firebase/firestore";

export const dbDeleteDocument = async ({
  collection,
  id,
}: {
  collection: string;
  id: string;
}) => {
  try {
    await deleteDoc(doc(db, collection, id));
    return { status: DB_METHOD_STATUS.SUCCESS };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};


export const dbDeleteSubCollectionDocument = async ({
  collection,
  id,
  subCollection,
  subCollectionId,
}: {
  collection: string;
  id: string;
  subCollection: string;
  subCollectionId: string;
}) => {
  try {
    await deleteDoc(doc(db, collection, id, subCollection, subCollectionId));
    return { status: DB_METHOD_STATUS.SUCCESS };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};