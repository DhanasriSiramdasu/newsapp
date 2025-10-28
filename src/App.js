import './App.css';

import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
  const App = () => {
  const pageSize=15;
  const apikey=process.env.NEWS_API_KEY;
  const [progress,  setProgress] = useState(10);
    return (
      <div>
        <Router>
        <Navbar/>
        <div>
          <LoadingBar
            color="#f11946"
            progress={progress}
          />
        </div>
         <Routes>
          <Route  path="/" element={<News progress={  setProgress} apikey={ apikey} key="general" pageSize={ pageSize} category="general" />}/>
          <Route  path="/about" element={<News progress={  setProgress} apikey={ apikey}  key="about" pageSize={ pageSize} category="about"/>}/>
          <Route  path="/general" element={<News progress={  setProgress} apikey={ apikey} key="general" pageSize={ pageSize} category="general" />}/>
          <Route  path="/business" element={<News progress={  setProgress} apikey={ apikey} key="business" pageSize={ pageSize} category="business" />}/>
          <Route  path="/sports" element={<News progress={  setProgress} apikey={ apikey} key="sports" pageSize={ pageSize} category="sports" />}/>
          <Route  path="/science" element={<News progress={  setProgress} apikey={ apikey} key="science" pageSize={ pageSize} category="science" />}/>
          <Route  path="/technology" element={<News progress={  setProgress} apikey={ apikey} key="technology" pageSize={ pageSize} category="technology" />}/>
          <Route  path="/health" element={<News progress={  setProgress} apikey={ apikey} key="health" pageSize={ pageSize} category="health" />}/>
          <Route  path="/entertainment" element={<News progress={  setProgress} apikey={ apikey} key="entertainment" pageSize={ pageSize} category="entertainment" />}/>
        </Routes>
        </Router>
      </div>
    )
}
export default App;