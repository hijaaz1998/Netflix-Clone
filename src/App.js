import React from "react";
import NavBar from "./components/NavBar/NavBar";
import './App.css'
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import { originals, action, comedyMovies, Romance, Horror } from './urls';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/><br /><br />
      <RowPost title = {'Netflix Originals'} url = {originals}/>
      <RowPost title = {'Comedy'} url = {comedyMovies} isSmall/>
      <RowPost title = {'Action'} url = {action} />
      <RowPost title = {'Romance'} url = {Romance} isSmall/>
      <RowPost title = {'Horror'} url = {Horror} />
    </div>
  );
}

export default App;
