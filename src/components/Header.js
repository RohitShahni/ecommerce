import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import { NavLink, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table'
import { REMOVE } from '../redux/actions/action'
import Button from 'react-bootstrap/Button'

const Header = () => {

    const getData = useSelector((state) => state.cartreducer.carts);
    const dispatch = useDispatch();
    const history = useNavigate();


    const [anchorEl, setAnchorEl] = useState(null);
    const [price, setPrice] = useState(0)
    console.log({ price })

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const removeHandler = (id) => {
        dispatch(REMOVE(id))
        history("/")
    }
    const total = () => {
        let price = 0;
        getData.map((ele, key) => {
            price = ele.price * ele.qnty + price
        });
        setPrice(price)
    }

    useEffect(() => {
        total();
    }, [total])

    const handleCheckout = (getData) => {

        const totalCost = getData.reduce((acc, item) => acc + item.price * item.qnty, 0);

        const formattedCart = getData.map((item, index) => ` ${index + 1}.  ${item.rname}  ${item.qnty} :  ${item.price} X ${item.qnty} =  ${item.price * item.qnty}`).join('\n');

        const whatsappMessage = `I Want To Order These Items :\n\n${formattedCart}\n\nTotal Cost : ${totalCost}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);

        const whatsappLink = `https://wa.me/7277994040?text=${encodedMessage}`;

        window.open(whatsappLink, '_blank');
    };


    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
            <Container>
                <NavLink to="/" className='text-decoration-none text-light mx-3' >Add to Cart</NavLink>
                <Nav className="me-auto">
                    <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
                </Nav>
                <Badge badgeContent={getData.length} color="primary" id="basic-button"
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

                {getData && getData.length ? <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Restaurant Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getData.map((e) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <NavLink to={`/cart/${e.id}`} onClick={handleClose}> <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" /></NavLink>
                                                </td>
                                                <td>
                                                    <p>{e.rname}</p>

                                                    <p>Price : ₹{e.price}</p>
                                                    <p>Quantity : {e.qnty}</p>
                                                    <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => removeHandler(e.id)} >
                                                        <i className='fas fa-trash smalltrash' ></i>
                                                    </p>
                                                </td>

                                                <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => removeHandler(e.id)} >
                                                    <i className='fas fa-trash largetrash' ></i>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            <>
                                <tr>
                                    <td>
                                        <p className='text-center'>Total :₹ {price}</p>
                                    </td>

                                    <td >
                                        <Button variant="primary" className='col-lg-12 btn btn-success' onClick={() => handleCheckout(getData)}>Check Out</Button>

                                    </td>
                                </tr>
                            </>


                        </tbody>
                    </Table>
                </div>

                    :

                    <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                        <i className='fas fa-close smallclose'
                            onClick={handleClose}
                            style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                        <p style={{ fontSize: 22 }}>Your carts is empty</p>
                        <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                    </div>



                }

            </Menu>
        </Navbar>
    )
}

export default Header;