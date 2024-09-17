import { useContext } from "react";
import { ArticleFormContext } from "./Context";

export const useArticleFormContext = () => {
    const { articleForm, setArticleForm } = useContext(ArticleFormContext);
    if(articleForm === undefined){
        throw new Error("Article form is undefined")
    }
    return {articleForm, setArticleForm};
}