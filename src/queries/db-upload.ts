import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const dbUploadEventMediaFileOnStorage = async ({
  mediaFile,
  imageID,
}: {
  mediaFile: File;
  imageID: string;
}) => {
  const imageRef = ref(storage, `shops/${imageID}`);
  const stringURL = await uploadBytes(imageRef, mediaFile).then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  });
  return stringURL;
};
