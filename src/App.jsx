import React from "react";
import { Body } from "./pages/Body/Body";
import { Header } from "./components/Header/Header";
import { useLocation } from "react-router-dom";
import  "./styles.css"


function App() {
  
  const location= useLocation()

  return ( 
  <>
  <Header/>
  <Body/>
  </>
    
  );
}

export default App;