import { deleteObject, getStorage, ref } from "firebase/storage";

const subDirectory = 'images';

export default async function deleteImageInFirebase(imageFilename) {
    const storage = getStorage();
    // Create a reference to the file to delete
    imageFilename = `${subDirectory}/${imageFilename}`
    const desertRef = ref(storage, imageFilename);

    // Delete the file
    deleteObject(desertRef).then(() => {
        console.log(`image ${imageFilename} deleted..`)
    }).catch((error) => {
        console.log("Error deleting image in firebase", error)
    });

}