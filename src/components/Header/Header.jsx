import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { userData, userLogout } from '../../app/slices/userSlice';
import "./Header.css";
import { getDataUser } from '../../services/apiCalls';

export const Header = () => {
    const userLogued = useSelector(userData).decodificado;
    const userToken = useSelector(userData).token;
    const [isLogued, setLogued] = useState(false);
    const dispatch = useDispatch();
    const [user, setUser] = useState(userLogued);

    useEffect(() => {
        if (userToken && userToken.length > 5) {
            setLogued(true);
            getDataUser(userToken)
                .then((userData) => {
                    console.log(userData)
                    setUser(userData)
                })
                .catch(() => {
                })
        } else {
            setLogued(false);
        }
    }, [userToken]);

    const logout = () => {
        dispatch(userLogout());
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="headerDesing">
            <Container>
                <Navbar.Brand>
                    <p className='p_color'>
                        {userLogued && userLogued.firstName && (
                            <>{`Bienvenido ${userLogued.firstName.toUpperCase()}`}</>
                        )}
                    </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto nav_link_home">
                        {isLogued && (
                            <>
                                <Nav.Link as={Link} to="/"><p className='p_color'>Inicio</p></Nav.Link>
                                <Nav.Link as={Link} to="/profile"><p className='p_color'>Perfil</p></Nav.Link>
                                {userLogued && userLogued.userRole === "1" && (
                                    <Nav.Link as={Link} to="/admin"><p className='p_color'>Admin</p></Nav.Link>
                                )}
                                {userLogued && userLogued.userRole !== "1" && (
                                    <Nav.Link as={Link} to="/citas"><p className='p_color'>Citas</p></Nav.Link>
                                )}
                                {userLogued && userLogued.userRole === "2" && (
                                    <Nav.Link as={Link} to="/doctor"><p className='p_color'>Listado de Citas</p></Nav.Link>
                                )}
                            </>
                        )}
                    </Nav>
                    {!isLogued && (
                        <Nav className="me-auto nav_link_log">
                            <>
                                <Nav.Link as={Link} to="/login"><p className='p_color'>Acceso</p></Nav.Link>
                                <Nav.Link as={Link} to="/create"><p className='p_color'>Registro</p></Nav.Link>
                            </>
                        </Nav>
                    )}
                    {isLogued && (
                        <Nav.Link onClick={logout}><p className='p_color'>Cerrar Sesión</p></Nav.Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
