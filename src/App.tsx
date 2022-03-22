import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { FullStack } from './components/FullStack/FullStack';
import { Details } from './components/Details/Details';
import { JobPowered } from './components/JobPowered/JobPowered';


function App() {
  return (
   <div>
     <Header/>
     <FullStack/>
     <Details/>
     <JobPowered/>
   </div>
  )
}

export default App;
