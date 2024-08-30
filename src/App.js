import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'

export default class App extends Component {
  pageSize=5;
  apikey=ProcessingInstruction.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar 
          height={3}
          color='##f11946'
          progress={this.state.progress}
          />
          <Routes>
          <Route exact path="/"> <News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country="in" category="general"/></Route>
          <Route exact path="/business"> <News key="business" setProgress={this.setProgress} apikey={this.apikey} pageSize={5} country="in" category="business"/></Route>
          <Route exact path="/entertainment"> <News key="entertainment" setProgress={this.setProgress} apikey={this.apikey} pageSize={5} country="in" category="entertainment"/></Route>
          <Route exact path="/general"> <News key="general" setProgress={this.setProgress} apikey={this.apikey}  pageSize={5} country="in" category="general"/></Route>
          <Route exact path="/health"> <News key="health" setProgress={this.setProgress} apikey={this.apikey} pageSize={5} country="in" category="health"/></Route>
          <Route exact path="/science"> <News key="science" setProgress={this.setProgress} apikey={this.apikey} pageSize={5} country="in" category="science"/></Route>
          <Route exact path="/sports"> <News key="sports" setProgress={this.setProgress} apikey={this.apikey} pageSize={5} country="in" category="sports"/></Route>
          <Route exact path="/technology"> <News key="technology" setProgress={this.setProgress} apikey={this.apikey} pageSize={5} country="in" category="technology"/></Route>
          </Routes>
          </Router>
      </div>
    )
  }
}

