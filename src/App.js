import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize=15;
  apikey=process.env.REACT_APP_NEWS_API_KEY;
  state=({
    progress:0,
  })

  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <div>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
        </div>
         <Routes>
          <Route  path="/" element={<News progress={this.setprogress} apikey={this.apikey} key="general" pageSize={this.pageSize} category="general" />}/>
          <Route  path="/about" element={<News progress={this.setprogress} apikey={this.apikey}  key="about" pageSize={this.pageSize} category="about"/>}/>
          <Route  path="/general" element={<News progress={this.setprogress} apikey={this.apikey} key="general" pageSize={this.pageSize} category="general" />}/>
          <Route  path="/business" element={<News progress={this.setprogress} apikey={this.apikey} key="business" pageSize={this.pageSize} category="business" />}/>
          <Route  path="/sports" element={<News progress={this.setprogress} apikey={this.apikey} key="sports" pageSize={this.pageSize} category="sports" />}/>
          <Route  path="/science" element={<News progress={this.setprogress} apikey={this.apikey} key="science" pageSize={this.pageSize} category="science" />}/>
          <Route  path="/technology" element={<News progress={this.setprogress} apikey={this.apikey} key="technology" pageSize={this.pageSize} category="technology" />}/>
          <Route  path="/health" element={<News progress={this.setprogress} apikey={this.apikey} key="health" pageSize={this.pageSize} category="health" />}/>
          <Route  path="/entertainment" element={<News progress={this.setprogress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} category="entertainment" />}/>
        </Routes>
        </Router>
      </div>
    )
  }
}
