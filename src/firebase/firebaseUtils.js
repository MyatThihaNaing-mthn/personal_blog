import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "./firebase";


export async function getTotalCount(collectionName){
    const coll = collection(db, collectionName);
    const snapshot = await getCountFromServer(coll).then(()=>{
        return snapshot.data().count;
    }).catch(error=> {
        throw new Error("Error getting total count from firebase", error)
    })

}