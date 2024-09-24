import fetch from "@/firebase/fetchDocument";
import { createMarkup } from "@/utils/utils";
import { useEffect, useState } from "react";

const id = "1727184626948";

export default function Article(){
    const [articleData, setArticleData] = useState(undefined);

    const getArticle = async() =>{
        const data = await fetch(id)
        console.log(data)
        setArticleData(data)
    }

    useEffect(()=> {
        console.log("fetching")
        getArticle();
    }, [])
    if (!articleData) {
        return <p>Loading...</p>;
    }
    return (
        <article>
            <div dangerouslySetInnerHTML={createMarkup(articleData.content)} />
        </article>
    );
}