import { db } from "@/firebase/firebase";
import { getTotalCount } from "@/firebase/firebaseUtils";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard";

export default function AllArticles() {
    const [articles, setArticles] = useState([]);
    const [lastDocRef, setLastDocRef] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const getDocsCount = async () => {
        const count = await getTotalCount("article-summary");
        setTotalCount(count)
    }

    const fetchArticlesChunk = async () => {
        const articlesRef = collection(db, "article-summary");
        const q = query(articlesRef, orderBy("createdAt"), limit(6));

        const snapshot = await getDocs(q).catch(error => {
            throw new Error("Error get the first of all articles", error)
        })
        setLastDocRef(snapshot.docs[snapshot.docs.length - 1]);
        setArticles(snapshot.docs);
    }

    useEffect(() => {
        getDocsCount()
        fetchArticlesChunk()
    }, [])

    return (
        <>
            <div className=" flex flex-col ">
                <div className=" my-4 font-cormoran_bold text-2xl">
                    <h1>All Articles</h1>
                </div>
                <section className=" all-articles grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                    {articles && articles.map(article => <ArticleCard key={article.data().id} article={article.data()} isFeatured={false} />)}
                </section>
            </div>
        </>
    )
}