import React from 'react';
import './App.css';
import ImageModalBox from './component/ModalImagebox/ImageModalBox.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SearchImage from './pages/SearchImage.tsx';
function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='/modalbox' element={<ImageModalBox />} />
          <Route path='search/:query' element={<SearchImage />} />
        </Routes>
        <ImageModalBox />
      </Router>
    </main>
  );
}

export default App;
