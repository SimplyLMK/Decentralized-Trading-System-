import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// import the 5 main components
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/LogIn/Login';
import Signup from './components/SignUp/Signup';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Navbar from './components/NavBar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
