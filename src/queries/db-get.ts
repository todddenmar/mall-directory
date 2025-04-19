import { db } from "@/firebase";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { getYearAndMonthString } from "@/lib/utils";
import { TShop } from "@/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

export const dbFetchCollection = async <T>(collectionName: string) => {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const results: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
    return { status: DB_METHOD_STATUS.SUCCESS, data: results };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
};

export const dbFetchLimitedCollection = async <T>({
  collectionName,
  maxLimit,
}: {
  collectionName: string;
  maxLimit: 100;
}) => {
  try {
    const q = query(collection(db, collectionName), limit(maxLimit));
    const querySnapshot = await getDocs(q);
    const results: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
    return { status: DB_METHOD_STATUS.SUCCESS, data: results };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
};

export const dbFetchDocument = async <T>(
  collectionName: string,
  id: string
) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { status: DB_METHOD_STATUS.SUCCESS, data: null }; // No data found
    }

    return { status: DB_METHOD_STATUS.SUCCESS, data: docSnap.data() as T };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
};
export const dbFetchDocumentByDate = async <T>(
  collectionName: string,
  dateToday: Date
) => {
  try {
    const { year, month } = getYearAndMonthString(dateToday);
    const day = dateToday.getDate().toString(); // Ensure it's a string
    console.log({ year, month, day });
    const docRef = doc(db, collectionName, year, month, day);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { status: DB_METHOD_STATUS.SUCCESS, data: null }; // No data found
    }

    return { status: DB_METHOD_STATUS.SUCCESS, data: docSnap.data() as T };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
};

export const dbFetchCollectionWhere = async <T>(
  collectionName: string,
  fieldName: string,
  fieldValue: string | number,
  operation?: "==" | "!="
) => {
  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, operation || "==", fieldValue)
    );
    const querySnapshot = await getDocs(q);
    const results: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
    return { status: DB_METHOD_STATUS.SUCCESS, data: results };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
};

export const getSearchResult = async ({
  queryValue,
}: {
  queryValue: string;
}) => {
  try {
    // First query: Match by name
    const racersRef = collection(db, DB_COLLECTION.SHOPS);
    const queryShopName = query(
      racersRef,
      where("name", "==", queryValue),
      limit(20)
    );

    // Fetch both queries
    const [snapshot1] = await Promise.all([getDocs(queryShopName)]);
    const results: TShop[] = [];

    const seen = new Set();
    snapshot1.forEach((doc) => {
      const racer = doc.data() as TShop;
      if (!seen.has(doc.id)) {
        seen.add(doc.id);
        results.push(racer);
      }
    });

    return { status: DB_METHOD_STATUS.SUCCESS, data: results };
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


export const dbFetchSubCollections = async <T>(
  collectionName: string,
  documentID: string,
  subCollectionName: string
) => {
  try {
    const q = query(
      collection(db, collectionName, documentID, subCollectionName)
    );
    const querySnapshot = await getDocs(q);
    const results: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
    return { status: DB_METHOD_STATUS.SUCCESS, data: results };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
};