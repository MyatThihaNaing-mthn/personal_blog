import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import PropTypes from 'prop-types';
import { fetchFeaturedArticles } from "@/firebase/fetchDocument";

const article = {
    content: '<h1><strong style="font-size: 24px;">Random Paragraph For those who are interested in finding random paragraphs</strong></h1><p>That\'s exactly what this webpage provides. If both a&nbsp;random word&nbsp;and a&nbsp;random sentence&nbsp;aren\'t quite long enough for your needs, then a random paragraph might be the perfect solution. Once you arrive at this page, you\'ll see a random paragraph. If you need another one, all you need to do is click on the "next paragraph" button. If you happen to need several random paragraphs all at once, you can use this other&nbsp;paragraph generator. Below you can find a number of ways that this generator can be used.</p>',
    tags: ["Java"],
    thumbnailImage: "https://cdn.prod.website-files.com/637b4af631bc1255bbd6377a/637b4af631bc120031d63787_olivia-blog-cover-image-8.jpg",
    title: "Mindfulness in a fast-paced world",
    createdAt: "Sept 30"
}

export default function ArticleList(){
    const [featuredArticles, setFeaturedArticles] = useState([]);

    const getFeaturedArticles = async() => {
        const articles = await fetchFeaturedArticles();
        setFeaturedArticles(articles);
    }

    useEffect(()=> {
        getFeaturedArticles()
    }, [])

    return(
        <div className="main w-full bg-white ">
            <div className=" heading-container p-8">
                <h1 className=" xs:text-2xl md:text-4xl max-w-2xl mb-4 font-cormoran_bold">Welcome to my learning journey blog! I write some technical and theoritical stuffs that I&lsquo;ve learned </h1>
                <div className=" w-full h-px bg-foreground my-8"></div>
            </div>
            <div className=" p-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <section className=" feature-articles w-full flex flex-col">
                    <p className=" text-2xl font-bold">Featured</p>
                    {featuredArticles.map((article)=> <ArticleCard key={article.id} article={article} isFeatured={true} />)}
                </section>
                <div className=" recent-articles-container  w-full flex flex-col">
                    <p className=" text-2xl font-medium">Recent</p>
                    <section className=" recent-articles w-full grid lg:grid-cols-2 gap-2">
                        <ArticleCard article={article} isFeatured={false} />
                        <ArticleCard article={article} isFeatured={false} />
                        <ArticleCard article={article} isFeatured={true} />
                        <ArticleCard article={article} isFeatured={true} />
                    </section>
                </div>
            </div>
        </div>
    )
}

ArticleList.propTypes = {
    article : PropTypes.object.isRequired
}