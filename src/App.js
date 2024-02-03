import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// import the  main components
import Dashboard from './components/Dashboard/Dashboard';

import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Navbar from './components/NavBar/Navbar';
import Sidebar from './components/Sidebar/sidebar';
import History from './components/History/history';
import HeroSection from './components/HeroSection/HeroSection';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
        <div className="container">
          <Navbar />
          {/* Establish routes to main components */}
          <Routes>
            <Route exact path="/" element={<HeroSection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/history" element={<History />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
