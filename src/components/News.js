import InfiniteScroll from "react-infinite-scroll-component";
import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner'

export default class News extends Component {
  constructor() {
    super();
    console.log("Hello...Iam a constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true
    }
  }

  async updateNews() {
    this.props.progress(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.progress(30);
    let data = await fetch(url);
    this.props.progress(50);
    let parseddata = await data.json();
    this.props.progress(80);
    this.setState({ loading: false });
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults
    });
    this.props.progress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  // handleleftclick=async()=>{
  //   if(this.state.page<=1)  return;
  //   // const prevpage=this.state.page-1;
  //   // this.setState({loading:true});
  //   // let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=90740460274d4989ba6f2a268a309077&page=${prevpage}&pageSize=${this.props.pageSize}`;
  //   // let data=await fetch(url);
  //   // let parseddata=await data.json();
  //   // this.setState({loading:false});
  //   // this.setState({
  //   //   articles:parseddata.articles,
  //   //   page:prevpage,
  //   // });
  //   this.setState({page:this.state.page-1});
  //   this.updateNews();
  // }

  // handlerightclick=async()=>{
  // // const nextpage=this.state.page+1;
  // // this.setState({loading:true});
  // // let url=`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=90740460274d4989ba6f2a268a309077&page=${nextpage}&pageSize=${this.props.pageSize}`;
  // // let data=await fetch(url);
  // // let parseddata=await data.json();
  // // this.setState({loading:false});
  // // this.setState({
  // //   articles:parseddata.articles,
  // //   page:nextpage,
  // // });
  // this.setState({page:this.state.page+1});
  // this.updateNews();
  // }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apikey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    if (!parsedData.articles || parsedData.articles.length === 0) {
    this.setState({ hasMore: false });
    return;
    }

    this.setState((prevstate)=>{
      return{
        articles: this.state.articles.concat(parsedData.articles),
        page: nextPage,
        totalResults: parsedData.totalResults,
        hasMore: this.state.articles.length < parsedData.totalResults
      }
    });
  };

  CapitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <>
        <div className="text-center" style={{ margin: "35px 0px" }}><h1>News Bird - Top {this.CapitalizeFirstLetter(this.props.category)} Headlines!</h1></div>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}              // function to call to load more
          hasMore={this.state.hasMore} // whether there are more items
          loader={<Spinner />}                   // what to show while loading
          // endMessage={
          //   <p style={{ textAlign: "center", marginTop: "20px" }}>
          //     <b>🎉 You have seen all the news!</b>
          //   </p>
          // }
        >
          <div className="container">
            <div className="row ">
              {this.state.articles.map((element) => {
                return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} url={element.url} source={element.source.name} author={element.author} publishedAt={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="buttons d-flex justify-content-between"> */}
        {/* <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleleftclick}>&larr;Previous</button> */}
        {/* <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/20))}type="button" className="btn btn-dark" onClick={this.handlerightclick}>Next&rarr;</button> */}
        {/* </div> */}
      </>
    );
  }
}
