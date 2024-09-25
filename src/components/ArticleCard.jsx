import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import PropTypes from 'prop-types';
import { convertMonthDayFromTimeUnits } from "@/utils/utils";

export default function ArticleCard({ article, isFeatured=false }) {
    const navigate = useNavigate();

    let featureArticle = 'text-xl bold';
    if(isFeatured === true){
        featureArticle = " text-3xl bold"
    }

    const clickHandler = (id) => {
        navigate(`article/${id}`)
    }

    return (
        <Card className=" w-full overflow-hidden border-none shadow-none cursor-pointer pb-4"
            onClick={()=>clickHandler(article.id)}>
            <CardHeader className=" p-0">
                <div className="w-full relative" style={{paddingBottom: '50%'}}>
                    <img src={article.thumbnailImage} alt="article image"
                        className=" absolute top-0 left-0 max-w-full w-full h-full object-cover rounded-xl" />
                </div>
            </CardHeader>
            <div className=" w-full flex flex-col items-end mb-2">
                <div className=" w-full h-px bg-foreground mt-4">
                </div>
                <div className=" text-sm">
                    {convertMonthDayFromTimeUnits(article.createdAt)}
                </div>
            </div>
            <CardContent className=" p-0 pb-4">
                <CardTitle className={featureArticle}>
                    {article && article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2 overflow-hidden text-ellipsis whitespace-normal leading-none">
                    {article.content}
                </CardDescription>
            </CardContent>
        </Card>
    )
}


// const TechTag = ({ tag }) => {
//     return (
//         <Card className="w-fit mt-2">
//             <CardContent className=" w-fit flex py-px px-1 justify-center items-center">
//                 {tag}
//             </CardContent>
//         </Card>
//     )
// }
// // Too bust 2day

// TechTag.propTypes = {
//     tag: PropTypes.string.isRequired
// }

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired,
    isFeatured: PropTypes.bool.isRequired
}