import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  // Capitalize category name
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fetch first batch of news
  const updateNews = async () => {
    props.progress(10);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.progress(30);

    try {
      const data = await fetch(url);
      if (!data.ok) throw new Error(`NewsAPI returned status ${data.status}`);
      const parsedData = await data.json();
      setArticles(parsedData.articles || []);
      console.log(parsedData.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
      setHasMore(false);
    }

    setLoading(false);
    props.progress(100);
  };

  // Run once when component mounts or category changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  // Fetch more data when scrolling
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    try {
      const data = await fetch(url);
      if (!data.ok) throw new Error(`NewsAPI returned status ${data.status}`);
      const parsedData = await data.json();

      if (!parsedData.articles || parsedData.articles.length === 0) {
        setHasMore(false);
        return;
      }

      setArticles((prev) => {
        setHasMore(prev.length + parsedData.articles.length < parsedData.totalResults);
        return prev.concat(parsedData.articles);
      });
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more news:", error);
      setHasMore(false);
    }
  };

  return (
    <>
      <div className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        <h1>News Bird - Top {capitalizeFirstLetter(props.category)} Headlines!</h1>
      </div>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles?.map((element) => (
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