import { collection, deleteDoc, getCountFromServer } from "firebase/firestore";
import { db } from "./firebase";
import { fetchDocumentById } from "./fetchDocument";


export async function getTotalCount(collectionName){
    const coll = collection(db, collectionName);
    const snapshot = await getCountFromServer(coll).catch(error=> {
        throw new Error("Error getting total count from firebase", error)
    })
    return snapshot.data().count;
}

export async function deleteDocument(collectionName, docId) {
    const doc = await fetchDocumentById(docId, collectionName);
    try{
        await deleteDoc(doc.ref)
    }catch(error){
        console.log("Error deleting document ", error);
        throw new Error("Error deleting document");
    }
}

