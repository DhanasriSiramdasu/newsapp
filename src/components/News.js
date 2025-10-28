import React, { useState,useEffect} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Capitalize category name
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fetch first batch of news
  const updateNews = async () => {
    props.progress(10);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    props.progress(30);

    const data = await fetch(url);
    props.progress(50);

    const parsedData = await data.json();
    props.progress(80);

    setArticles(parsedData.articles);
    setLoading(false);
    props.progress(100);
  };

  // Run once when component mounts or category changes
  useEffect(() => {
    setPage(1);
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  // Fetch more data when scrolling
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    if (!parsedData.articles || parsedData.articles.length === 0) {
      setHasMore(false);
      return;
    }

    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setPage(nextPage);
    setHasMore(articles.length + parsedData.articles.length < parsedData.totalResults);
  };

  return (
    <>
      <div className="text-center" style={{ margin: "35px 0px" ,marginTop:'90px'}}>
        <h1>News Bird - Top {capitalizeFirstLetter(props.category)} Headlines!</h1>
      </div>
      {loading}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageurl={element.urlToImage}
                  url={element.url}
                  source={element.source?.name || "Unknown"}
                  author={element.author || "Unknown"}
                  publishedAt={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
