import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

export  async function uploadImageToFirebase(file){

    if(!file){
        return null;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}/_${Date.now()}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
    }catch(error){
        console.log("Error uploading image to firebase", error);
        return null;
    }

}

export async function  uploadBase64ImageToFirebase (base64Image, filename ) {
    if (!base64Image) return null;

  const storage = getStorage();
  const storageRef = ref(storage, `images/${filename}_${Date.now()}`);

  try {
    // Upload the base64 image to Firebase
    const snapshot = await uploadString(storageRef, base64Image, 'data_url');
    
    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("downdloadurl", downloadURL)
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    return null;
  }
  };