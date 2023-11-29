import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Offcanvas } from 'react-bootstrap'
import { BsBagPlus, BsTrash3 } from "react-icons/bs";
import style from './style.module.css'
import { deleteFavorite, getFavorites, agregarTodosAlCarrito } from '../../../redux/actions';
import Swal from 'sweetalert2';

const Favorites = (props) => {

    const [datos, setDatos] = useState('');

    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const handleCart = async (cart) => {
        const dataCart = {
            id_usuario: cart.id_usuario,
            cantidad: 1,
            subtotal: cart.producto.precio,
            id_carrito: localStorage.getItem('id_carrito'),
            id_producto: cart.id_producto,
        }
        try {
            const { data } = await axios.post('/carrito/addItem', dataCart);
            if (!data.error) {
                handleDelete(cart.id_producto)
                Swal.fire({
                    title: 'Se añadio el producto al carrito',
                    icon: 'success'
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        const datos = {
            userId: parseInt(localStorage.getItem('id')),
            productId: id
        };
        try {
            const { data } = await axios.post('/favoritos/delete', datos);
            if (!data.error) {
                // Swal.fire({
                //     title: data.message,
                //     icon: 'success'
                // })
                setDatos(data)
            }

        } catch (error) {
            console.error(error);
        }
    }


    // Funcion de agregar todos los elementos de favoritos al carrito de compras: 
    const handleAddAllToCart = async () => {
        try {

            for (const item of favorites) {
                const dataCart = {
                    id_usuario: item.id_usuario,
                    cantidad: 1,
                    subtotal: item.producto.precio,
                    id_carrito: localStorage.getItem('id_carrito'),
                    id_producto: item.id_producto,
                }
                try {
                    const { data } = await axios.post('/carrito/addItem', dataCart);
                    if (!data.error) {
                        handleDelete(item.id_producto)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            Swal.fire({
                title: 'Todos los productos se han agregado al carrito',
                icon: 'success'
            });
        } catch (error) {
            Swal.fire({
                title: 'Ocurrio un error',
                icon: 'error'
            });
            console.error(error);
        }
        // dispatch(agregarTodosAlCarrito(userId, favorites))
        //     .then(() => {
        //         Swal.fire({
        //             title: 'Todos los productos se han agregado al carrito',
        //             icon: 'success'
        //         });
        //     })
        //     .catch((error) => {
        //         Swal.fire({
        //             title: 'Error al agregar productos al carrito',
        //             text: 'Hubo un problema al agregar los productos al carrito',
        //             icon: 'error'
        //         });
        //     });
    };

    useEffect(() => {
        if (localStorage.getItem('id')) dispatch(getFavorites(localStorage.getItem('id')))
    }, [dispatch, Swal, datos, props.show]);

    return (
        <>
            <Offcanvas show={props.show} onHide={props.toggleFavorites} placement='end' backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mi Lista de Favoritos</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        favorites?.map(fav => (
                            <div key={fav.id} className={style.card_container}>
                                <img className={style.img_product} src={fav.producto.img_productos[0].url} alt="" />

                                <div className={style.card_info}>
                                    <div>
                                        <p>{fav.producto.nombre}</p>
                                        <p>$ {fav.producto.precio}</p>
                                    </div>
                                    <div className={style.btn_container}>
                                        <button className={style.btn} onClick={() => handleCart(fav)}><BsBagPlus className={style.btn_icon} /></button>
                                        <button className={style.btn} onClick={() => handleDelete(fav.producto.id)}><BsTrash3 className={style.btn_icon} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <button className={style.btn_addAlltoCart} onClick={handleAddAllToCart}>Agregar todos al carrito</button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Favorites
