import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './style.css';

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
            <Container>
                <NavLink to="/" className='text-decoration-none text-light mx-3' >Add to Cart</NavLink>
                <Nav className="me-auto">
                    <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
                </Nav>
                <Badge badgeContent={4} color="primary" id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>

                </Badge>

            </Container>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                    <i className='fas fa-close smallclose' style={{ position: 'absolute', top: 2, right: 20, fontSize: 23, cursor: "pointer" }} onClick={handleClose} ></i>
                    <p>Your Cart is Empty</p>
                </div>
            </Menu>
        </Navbar>
    )
}

export default Header;