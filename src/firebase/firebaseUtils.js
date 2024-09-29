import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "./firebase";
import { fetchDocumentById } from "./fetchDocument";


export async function getTotalCount(collectionName){
    const coll = collection(db, collectionName);
    const snapshot = await getCountFromServer(coll).catch(error=> {
        throw new Error("Error getting total count from firebase", error)
    })
    return snapshot.data().count;
}

export async function deleteDocumet(collectionName, docId) {
    const doc = await fetchDocumentById(docId, collectionName);
    try{
        await doc.ref.delete();
    }catch(error){
        console.log("Error deleting document ", error);
        throw new Error("Error deleting document");
    }
}