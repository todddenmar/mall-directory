import { db } from "@/firebase";
import { DB_METHOD_STATUS } from "@/lib/config";
import { getYearAndMonthString } from "@/lib/utils";
import { doc, DocumentData, setDoc } from "firebase/firestore";

export const dbSetDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T
) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
    return { status: DB_METHOD_STATUS.SUCCESS };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};

export const dbSetDocumentByDate = async <T extends DocumentData>(
  collectionName: string,
  dateToday: Date,
  data: T
) => {
  try {
    const year = getYearAndMonthString(dateToday).year;
    const month = getYearAndMonthString(dateToday).month;
    const day = dateToday.getDate().toString();
    await setDoc(doc(db, collectionName, year), {
      updatedAt: new Date().toISOString(),
    });
    await setDoc(doc(db, collectionName, year, month, day), data);
    return { status: DB_METHOD_STATUS.SUCCESS };
  } catch (e) {
    return {
      status: DB_METHOD_STATUS.ERROR,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
