import React from 'react';
import './App.css';
import HomePage from './pages/Home/HomePage.tsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SearchImage from './pages/SearchImage/SearchImage.tsx';
import Videos from './pages/Videos/Videos.tsx';
import SearchVideo from './pages/VideoSearch/SearchVideo.tsx';
import CommonModal from './component/CommonModal/CommonModal.tsx';
function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/modalbox' element={<CommonModal />} />
          <Route path='/search' element={<SearchImage />} />
          <Route path='/video' element={<Videos />} />
          <Route path='/videos' element={<SearchVideo />} />
        </Routes>

      </Router>
    </main>
  );
}

export default App;
