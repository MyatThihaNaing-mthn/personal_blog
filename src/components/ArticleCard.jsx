import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import PropTypes from 'prop-types';
export default function ArticleCard({article}){
    return (
        <Card className="w-[350px]">
           <CardHeader>
            <img src="" alt="article image"
                className="max-w-full w-full min-h-48 bg-center bg-cover border"  />
           </CardHeader>
           <CardContent>
            <CardTitle>
                {article && article.title}
            </CardTitle>
            <CardDescription>
            There are a number of reasons you may need a block of text and when you do, a random paragraph can be the perfect solution. If you happen to be a web designer and you need some random text to show in your layout, a random paragraph can be an excellent way to do this.
            </CardDescription>
           </CardContent>
           <CardFooter>
            <TechTag tag={"Java"}/>
           </CardFooter>
        </Card>
    )
}


const TechTag = ({tag}) => {
    return (
        <Card className="w-fit">
          <CardContent className=" w-fit flex p-1 justify-center items-center">
            {tag}
          </CardContent>
        </Card>
      )
}
// Too bust 2day

TechTag.propTypes = {
    tag: PropTypes.string.isRequired
}

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired
}