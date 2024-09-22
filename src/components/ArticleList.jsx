import ArticleCard from "./ArticleCard";
import PropTypes from 'prop-types';

const article = {
    content: '<h1><strong style="font-size: 24px;">Random Paragraph For those who are interested in finding random paragraphs</strong></h1><p>That\'s exactly what this webpage provides. If both a&nbsp;random word&nbsp;and a&nbsp;random sentence&nbsp;aren\'t quite long enough for your needs, then a random paragraph might be the perfect solution. Once you arrive at this page, you\'ll see a random paragraph. If you need another one, all you need to do is click on the "next paragraph" button. If you happen to need several random paragraphs all at once, you can use this other&nbsp;paragraph generator. Below you can find a number of ways that this generator can be used.</p>',
    tags: ["Java"],
    thumbnailImage: "https://firebasestorage.googleapis.com/v0/b/personal-blog-app-dcaeb.appspot.com/o/images%2Fadmin1.png_1726747883805?alt=media&token=7098ab7a-b310-4aef-ad1f-de7a671d2814",
    title: "Hello"
}

export default function ArticleList(){
    return(
        <section>
            <ArticleCard article={article} />
        </section>
    )
}

ArticleList.propTypes = {
    article : PropTypes.object.isRequired
}