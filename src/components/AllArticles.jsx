import { db } from "@/firebase/firebase";
import { getTotalCount } from "@/firebase/firebaseUtils";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard";
import PropTypes from 'prop-types';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useNavigate, useParams } from "react-router-dom";

const itemsPerPage = 4;

export default function AllArticles() {
    const [articles, setArticles] = useState([]);
    const [docRefs, setDocRefs] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { pageNo } = useParams();
    const currentPage = parseInt(pageNo || "1", 10);

    const getDocsCount = async () => {
        const count = await getTotalCount("article-summary");
        setTotalCount(Math.ceil(count / itemsPerPage))
    }

    const fetchArticlesChunk = async (pageNum) => {
        const articlesRef = collection(db, "article-summary");
        let q = query(articlesRef, orderBy("createdAt"), limit(itemsPerPage));

        if(pageNum > 1 && docRefs[pageNo-2]){
            q = query(articlesRef, orderBy("createdAt"), startAfter(docRefs[ pageNum-2 ]), limit(itemsPerPage))
        }

        const snapshot = await getDocs(q).catch(error => {
            throw new Error("Error get the first of all articles", error)
        })
        if(snapshot.docs.length > 0){
            setDocRefs(prevDocRefs => {
                const updatedDocRefs = [...prevDocRefs];
                updatedDocRefs[pageNum - 1] = snapshot.docs[snapshot.docs.length - 1];
                return updatedDocRefs
            })
        }
        setArticles(snapshot.docs);
    }

    useEffect(() => {
        getDocsCount()
    }, [])

    useEffect(() => {
        fetchArticlesChunk(currentPage)
    }, [currentPage])

    return (
        <>
            <div className=" flex flex-col ">
                <div className=" my-4 font-cormoran_bold text-2xl">
                    <h1>All Articles</h1>
                </div>
                <section className=" all-articles grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                    {articles && articles.map(article => <ArticleCard key={article.data().id} article={article.data()} isFeatured={false} />)}
                </section>
                <CustomPagination count={totalCount} />
            </div>
        </>
    )
}

function CustomPagination({ count = 1 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const prevHandler = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }
    const nextHandler = () => {
        setCurrentPage(prev => Math.min(prev + 1, count))
    }
    const clickHandler = (item) => {
        setCurrentPage(item)
    }
    // Update items when `count` changes
    useEffect(() => {
        const pages = [];
        for (let i = 1; i <= count; i++) {
            if (i >= currentPage && pages.length < 3) {
                pages.push(i);
            }
        }
        setItems(pages);
    }, [count, currentPage]);

    useEffect(() => {
        navigate(`/all-articles/${currentPage}`);
    }, [currentPage, navigate]); 

    return (
        <Pagination className=" px-8">
            <PaginationContent>
                {currentPage !== 1 && <>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={prevHandler}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                </>}
                {/* Render pagination items */}
                {items.map((item) => (
                    <PaginationItem key={item}>
                        <PaginationLink
                            href="#"
                            onClick={() => clickHandler(item)}
                            isActive={item === currentPage}
                        >
                            {item}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {currentPage + 2 < count && <>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={nextHandler}
                        />
                    </PaginationItem>
                </>}

            </PaginationContent>
        </Pagination>
    );
}
CustomPagination.propTypes = {
    count: PropTypes.number.isRequired
}