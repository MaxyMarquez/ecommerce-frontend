import React, { useEffect, useState } from 'react'
import NavBar from '../../LandingPage/Navbar/NavBar'
import UserPanel from '../UserPanel'
import styles from './styles.module.css'
import axios from 'axios'
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap'


const UserShopping = () => {

    const [facturas, setFacturas] = useState(null);
    const [factura, setFactura] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
        try {
            const { data } = await axios.get(`/facturas/${id}`)
            setFactura(data.data)
        } catch (error) {
            console.error(error);
        }
        setShow(true)
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const { data } = await axios.get(`/facturas/facturas_usuario/${parseInt(localStorage.getItem('id'))}`);
                setFacturas(data.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchTickets();
    }, [])

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <UserPanel />
                <div className={styles.facturas}>
                    {
                        facturas?.map(factura => (
                            <>
                                <ul>
                                    <li>
                                        <div className={styles.factura_div}>
                                            <span>
                                                {moment(factura.createdAt).format("DD/MM/YYYY")}
                                            </span>
                                        </div>
                                        <div className={styles.factura_div}>
                                            <span>
                                                $ {factura.total}
                                            </span>
                                        </div>
                                        <div className={styles.factura_div}>
                                            <span>
                                                {factura.statud.nombre}
                                            </span>
                                        </div>
                                        <div className={styles.factura_div}>
                                            <button onClick={() => handleShow(factura.id)}>Ver Detalle</button>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        ))
                    }
                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Detalle de Compra</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                                {
                                    factura?.factura_detalles?.map(item => (
                                        <tr key={item.producto.id}>
                                            <td>{item.producto.nombre}</td>
                                            <td>$ {item.producto.precio}</td>
                                            <td>{item.cantidad}</td>
                                            <td>$ {item.subtotal}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>TOTAL</td>
                                    <td></td>
                                    <td></td>
                                    <td className={styles.total}>$ {factura?.factura_detalles?.reduce((acc, item) => acc + item.subtotal, 0)}
                                    </td>
                                </tr>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default UserShopping