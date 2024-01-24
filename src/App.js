import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// import the  main components
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/LogIn/Login';
import Signup from './components/SignUp/Signup';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Navbar from './components/NavBar/Navbar';
import Sidebar from './components/Sidebar/sidebar';
import History from './components/History/history';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
        <div className="container">
          <Navbar />
          {/* Establish routes to main components */}
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/history" element={<History />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
