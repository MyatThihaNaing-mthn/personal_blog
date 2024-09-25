import { useParams } from "react-router-dom";
import CreateBlogPost from "./CreateBlogPost";
import { useCallback, useEffect, useState } from "react";
import { fetchDocumentById } from "@/firebase/fetchDocument";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function EditArticle(){
    const [article, setArticle] = useState(undefined);
    const [docRef, setDocRef] = useState();
    const params = useParams();

    const getArticle = useCallback(async () => {
        const document = await fetchDocumentById(params.id, "articles");
        setArticle(document.data())
        const ref = doc(db, "articles", document.id);
        setDocRef(ref)
    }, [params.id])

    const articleUpdateHandler = async (updatedArticle)=> {
        console.log("updating article")
        await updateDoc(docRef, updatedArticle).catch(error => {console.log("error updating article doc", error)})
        if(summaryChanged){
            const document = await fetchDocumentById(params.id, "article-summary");
            const ref = doc(db, "article-summary", document.id);
            const updateSummary = {
                title: updatedArticle.title,
                thumbnailImage: updatedArticle.thumbnailImage
            }
            await updateDoc(ref, updateSummary).catch(error => {console.log("error updating summary", error)})
        }
    }

    const summaryChanged = (article, updatedArticle) => {
        if(article.title !== updatedArticle.title){
            return true
        }else if(article.thumnailImage !== updatedArticle.thumnailImage){
            return true
        }
        return false
    }

    useEffect(()=> {
        getArticle()
    }, [getArticle])

    return (
        <>
            {article && <CreateBlogPost article={article} updateHandler={articleUpdateHandler}/>}
        </>
    )
}
