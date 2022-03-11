import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header/Header';
import { FullStack } from './components/FullStack/FullStack';
import { Details } from './components/Details/Details';


function App() {
  return (
   <div>
     <Header/>
     <FullStack/>
     <Details/>
   </div>
  )
}

export default App;
