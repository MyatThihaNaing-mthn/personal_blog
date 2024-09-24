// Create a reference to the cities collection
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";

export default async function fetch(id){
    console.log(id)
    const articlesRef = collection(db, "articles");

    const q = query(articlesRef, where("id", "==", id));

    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty){
        const firstDoc = querySnapshot.docs[0];
        console.log(firstDoc.id, " => ", firstDoc.data());
        //update fetch count
        const docRef = doc(db, "articles", firstDoc.id);
        const updatedData = {
            fetchCount: (firstDoc.data().fetchCount || 0) + 1 
        };
        updateDoc(docRef, updatedData)
        updateArticleSummary(firstDoc.id)
        return firstDoc.data(); 
    }else{
        throw new Error("No matching documents found");
    } 

}


async function updateArticleSummary(id) {
    console.log(id)
    const summaryRef = collection(db, "article-summary");

    const q = query(summaryRef, where("id", "==", id));

    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty){
        const firstDoc = querySnapshot.docs[0];
        
        const docRef = doc(db, "article-summary", firstDoc.id);
        const updatedData = {
            fetchCount: (firstDoc.data().fetchCount || 0) + 1 
        };
        await updateDoc(docRef, updatedData).catch(error => {console.log("error updating summary doc", error)}) 
    }else{
        throw new Error("No matching documents found");
    }

}

export async function fetchFeaturedArticles() {
    const summaryRef = collection(db, "article-summary");
    const q = query(summaryRef, orderBy("fetchCount", "desc"), limit(2));

    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty){
        const featuredArticles = querySnapshot.docs.map(doc => ({
            ...doc.data()
        }));
        return featuredArticles;
    }else{
        console.log("No documents found for features")
        throw new Error("No matching documents found"); 
    }
}