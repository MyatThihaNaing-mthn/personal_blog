import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import PropTypes from 'prop-types';

export default function ArticleCard({ article, isFeatured=false }) {

    let featureArticle = '';
    if(isFeatured === true){
        featureArticle = " text-3xl bold"
    }

    return (
        <Card className=" w-full overflow-hidden border-none shadow-none">
            <CardHeader className=" p-0">
                <div className="w-full aspect-[2/1]">
                    <img src={article.thumbnailImage} alt="article image"
                        className="max-w-full w-full h-full object-cover rounded-xl" />
                </div>
            </CardHeader>
            <div className=" w-full flex flex-col items-end mb-2">
                <div className=" w-full h-px bg-foreground mt-4">
                </div>
                <div className=" text-sm">
                    {article.createdAt}
                </div>
            </div>
            <CardContent className=" p-0 pb-4">
                <CardTitle className={featureArticle}>
                    {article && article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2 overflow-hidden text-ellipsis whitespace-normal leading-none">
                    There are a number of reasons you may need a block of text and when you do, a random paragraph can be the perfect solution. If you happen to be a web designer and you need some random text to show in your layout, a random paragraph can be an excellent way to do this.
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