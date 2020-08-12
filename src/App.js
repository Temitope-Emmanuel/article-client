import React from 'react';
import MainRouter from "./MainRouter"
import {BrowserRouter as Router} from "react-router-dom"
import {ThemeProvider} from "@material-ui/core"
import Home from "./core/Home"
import theme from "./config/theme"
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme} >
        <Home/>
      </ThemeProvider>
    </Router>    
    );
}

export default App;