import { createBrowserRouter } from "react-router-dom";
import LogIn from "./components/LogIn";
import CreateBlogPost from "./components/CreateBlogPost";
import ArticleList from "./components/ArticleList";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <ArticleList/>
        },
        {
            path: "/article/create",
            element: <CreateBlogPost/>
        },
        {
            path: "/login",
            element: <LogIn/>
        }
    ]
)

export default router;