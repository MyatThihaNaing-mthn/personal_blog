import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchFeaturedArticles, fetchRecentArticles } from "@/firebase/fetchDocument";

export default function ArticleList(){
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);

    const loadArticles = async() => {
        const features = await fetchFeaturedArticles();
        const recents = await fetchRecentArticles();

        const filteredRecents = recents.filter(recent => 
            !features.some(featured => recent.id === featured.id)
        );

        setFeaturedArticles(features)
        setRecentArticles(filteredRecents)
    }

    useEffect(()=> {
        loadArticles()
    }, [])

    return(
        <div className="main w-full bg-white ">
            <div className=" heading-container p-8">
                <h1 className=" xs:text-2xl md:text-4xl max-w-2xl mb-4 font-cormoran_bold">Welcome to my learning journey blog! I write some technical and theoritical stuffs that I&lsquo;ve learned </h1>
                <div className=" w-full h-px bg-foreground my-8"></div>
            </div>
            <div className=" p-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <section className=" feature-articles w-full flex flex-col">
                    <p className=" text-2xl font-bold">Featured</p>
                    {featuredArticles.map((article)=> <ArticleCard key={article.id} article={article} isFeatured={true} />)}
                </section>
                <div className=" recent-articles-container  w-full flex flex-col">
                    <p className=" text-2xl font-medium">Recent</p>
                    <section className=" recent-articles w-full grid lg:grid-cols-2 gap-2">
                        {recentArticles && recentArticles.map(recent=> <ArticleCard key={recent.id} article={recent} isFeatured={false} />)}
                    </section>
                </div>
            </div>
        </div>
    )
}
