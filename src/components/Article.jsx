import fetch from "@/firebase/fetchDocument";
import { createMarkup } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth/useAuth";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteDocument } from "@/firebase/firebaseUtils";


export default function Article() {
    const [articleData, setArticleData] = useState(undefined);
    const [showDialog, setShowDialog] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const editHandler = () => {
        navigate(`/article/edit/${param.id}`)
    }

    const deleteHandler = async () => {
        await deleteDocument("articles", param.id)
        await deleteDocument("article-summary", param.id)
        navigate("/")
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
            <div className=" article-content" dangerouslySetInnerHTML={createMarkup(articleData.content)} />
            {userLoggedIn && <div className="fixed bottom-16 right-4 z-10">
                <Button className="w-auto px-4 py-2" onClick={editHandler}>
                    Edit
                </Button>
            </div>}
            {userLoggedIn && <div className="fixed bottom-16 left-4 z-10">
                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                    <AlertDialogTrigger asChild>
                        <Button className="w-auto px-4 py-2">
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Do you really want to delete?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={()=> setShowDialog(false)} >Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteHandler}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>}
        </article>
    );
}