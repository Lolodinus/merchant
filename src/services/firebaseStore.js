import { ref, getDownloadURL } from "firebase/storage";

import { storage } from "../config/firebase";


export const _getImageRefFromStorege = async (imgPath) => {
    const imgFullPath = `gs://${ process.env.REACT_APP_FIREEBASE_STORAGE_BUCKET }/${ imgPath }.png`;
    const imgRef = await ref(storage, imgFullPath);
    const imgURL = await getDownloadURL(imgRef);
    return imgURL;
}