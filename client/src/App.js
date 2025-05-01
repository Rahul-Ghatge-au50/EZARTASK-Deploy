import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TaskList from "./components/TaskList";
import NavBar from './components/Navbar';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className='container mt-5' >
        <Routes>
          <Route path='/' element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/task/:id' element={<PrivateRoute><TaskForm /></PrivateRoute>} />
          <Route path='/task' element={<PrivateRoute><TaskForm /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
