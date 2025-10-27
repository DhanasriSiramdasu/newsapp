import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageurl, url ,source,author,publishedAt} = this.props;
    return (
      <div>
        <div className="card my-2" style={{width: "18rem" }}>
          <div className="badge" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0',padding:'0.2rem'}}>
                <span className="bg-danger border p-1 border-light ">{source}<span className="visually-hidden">New alerts</span></span>
              </div>
          <img src={imageurl ? imageurl : "https://www.investors.com/wp-content/uploads/2017/10/stock-sailing-rough-adobe.jpg"} className="card-img-top" height="150px" width="30px" alt="..." />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={url} target="blank" className="btn  btn-dark btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    );
  }
}
