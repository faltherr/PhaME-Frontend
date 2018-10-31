import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        {routes}
        <Footer/>
      </div>
    );
  }
}

export default App;
