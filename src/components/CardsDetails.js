import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE, ADD, REMOVEIndidualItem } from '../redux/actions/action'


const CardsDetails = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch();

    const { id } = useParams();
    const history = useNavigate();
    const getData = useSelector((state) => state.cartreducer.carts);

    const compare = () => {
        let compareData = getData.filter((e) => {
            return e.id == id
        });
        setData(compareData);
    }

    useEffect(() => {
        compare();
    }, [id])



    const send = (e) => {
        dispatch(ADD(e))

    }
    const removeHandler = (id) => {
        dispatch(REMOVE(id))
        history("/");
        setData([]);

    }

    const removeItem = (item) => {
        dispatch(REMOVEIndidualItem(item))


    }
    console.log({ data })
    return (
        <>
            <div className="container mt-2">
                <h2 className='text-center'>Iteams Details Page
                </h2>

                <section className='container mt-3'>
                    <div className="iteamsdetails">

                        {
                            data && data.map((ele) => {
                                return (
                                    <>
                                        <div className="items_img">
                                            <img src={ele.imgdata && ele.imgdata} alt="" />
                                        </div>

                                        <div className="details">
                                            <Table>
                                                <tr>
                                                    <td>
                                                        <p> <strong>Restaurant</strong>  : {ele.rname && ele.rname}</p>
                                                        <p> <strong>Price</strong>  : ₹ {ele.price}</p>
                                                        <p> <strong>Dishes</strong>  : {ele.address && ele.address}</p>
                                                        <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                                                        <div className="mt-5 d-flex justify-content-between align-items-center" style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                            <span style={{ fontSize: 24 }} onClick={ele.qnty <= 0 ? removeHandler(ele.id) : () => removeItem(ele)}>-</span>
                                                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                                                            <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                                                        </div>

                                                    </td>

                                                    <td>
                                                        <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}> {ele.rating && ele.rating}★	</span></p>
                                                        <p><strong>Order Review :</strong> <span >{ele.somedata && ele.somedata}</span></p>
                                                        <p onClick={() => removeHandler(ele.id)}><strong>Remove :</strong> <span ><i className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>
                                                    </td>
                                                </tr>
                                            </Table>
                                        </div>

                                    </>
                                )

                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default CardsDetails