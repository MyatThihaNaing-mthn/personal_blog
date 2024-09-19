import { doc, setDoc } from "firebase/firestore"; 
import { db } from "./firebase";

export default async function uploadDocument(document, collection) {
    setDoc(doc(db, collection, Date.now().toString()), document).then(
        console.log("uploaded document to firestore")
    ).catch(error => {
        console.log("error uploading document to firestore", error)
    })
}