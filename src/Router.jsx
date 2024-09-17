import { createBrowserRouter } from "react-router-dom";
import LogIn from "./components/LogIn";
import CreateBlogPost from "./components/CreateBlogPost";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <LogIn/>
        },
        {
            path: "/article/create",
            element: <CreateBlogPost/>
        }
    ]
)

export default router;