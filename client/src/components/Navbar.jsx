import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavBar() {

  const navigate = useNavigate();
  let token  = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">EZAR Task</Navbar.Brand>
          <Nav className="me-auto">
          {
            token ? 
            <Nav.Item>
             <button style={{background:'none',border:'none'}} onClick={handleLogout} >Logout</button>
            </Nav.Item>
            :
            <>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            </>
          }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
