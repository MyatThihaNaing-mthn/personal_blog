import fetch from "@/firebase/fetchDocument";
import { createMarkup } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth/useAuth";

export default function Article() {
    const [articleData, setArticleData] = useState(undefined);
    const param = useParams();
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();

    const editHandler = () => {
        navigate(`/article/edit/${param.id}`)
    }

    const getArticle = useCallback(async () => {
        const data = await fetch(param.id)
        console.log(data)
        setArticleData(data)
    }, [param.id]);

    useEffect(() => {
        getArticle();
    }, [getArticle])
    if (!articleData) {
        return <p>Loading...</p>;
    }
    return (
        <article>
            <div dangerouslySetInnerHTML={createMarkup(articleData.content)} />
            {userLoggedIn && <div className="fixed bottom-16 right-4 z-10">
                <Button className="w-auto px-4 py-2" onClick={editHandler}>
                    Edit
                </Button>
            </div>}
        </article>
    );
}