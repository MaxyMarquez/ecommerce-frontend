import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarDelCarrito, getCarrito, actualizarCarrito } from '../../redux/actions';
import { BsPlusLg, BsDash, BsTrash3 } from "react-icons/bs";
import NavBar from '../LandingPage/Navbar/NavBar'
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './carrito.module.css';
import { FaPaypal } from "react-icons/fa";

const Carrito = () => {
  const dispatch = useDispatch();

  const userId = parseInt(localStorage.getItem('id'));
  const idCarrito = parseInt(localStorage.getItem('id_carrito'));

  const carrito = useSelector(state => state.carrito);
  console.log(carrito);
  const [updateValue, setUpdateValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          dispatch(getCarrito(userId, idCarrito));
          setIsLoading(false);
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [dispatch, updateValue]);

  const handlePayButtonClick = async () => {
    try {
      if (!userId || !idCarrito) {
        console.error('ID de usuario o ID de carrito no encontrados. Usuario no autenticado o carrito no válido.');
        return;
      }
      const response = await axios.post('/pago/create-order', { id_user: userId, id_carrito: idCarrito });
      console.log(response);
      window.open(`${response?.data?.links[1].href}`);
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
    }
  };

  const handleAddItem = async (product) => {
    console.log(product);
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    }
    try {
      const { data } = await axios.post('/carrito/addItem', dataCart);
      if (!data.error) {
        setUpdateValue(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (product) => {
    console.log(product);
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    }
    try {
      const { data } = await axios.post('/carrito/removeItem', dataCart);
      if (!data.error) {
        setUpdateValue(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (product) => {
    console.log(product);
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    }
    try {
      const { data } = await axios.post('/carrito/deleteItem', dataCart);
      if (!data.error) {
        setUpdateValue(data)
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <NavBar />
      <div className='container'>
        <h2>Carrito de Compras</h2>
        <div className={styles.container}>
          {
            (carrito[0]?.detalle_carritos?.map(item => (
              console.log(item),
              <div key={item.id} className={styles.product_item}>
                <picture className={styles.product_img}>
                  <img src={item.producto.img_productos[0].url} alt="" />
                </picture>
                <div className={styles.product_name}>
                  <p>{item.producto?.nombre}</p>
                </div>
                <div>
                  <p className={styles.product_title}>Valor</p>
                  <p className={styles.product_price}>$ {item.producto.precio}</p>
                </div>
                <div className={styles.product_input_container}>
                  <p className={styles.product_title}>Cantidad</p>
                  <div className={styles.product_input}>
                    <button className={styles.btn_product} onClick={() => handleRemoveItem(item)}>{item.cantidad == 1 ? <BsTrash3 className={styles.btn_icon_trash} /> : <BsDash className={styles.btn_icon} />}</button>
                    <input
                      className={styles.input}
                      type="text"
                      value={item.cantidad}
                      disabled
                    />
                    <button className={styles.btn_product} onClick={() => handleAddItem(item)}><BsPlusLg className={styles.btn_icon} /></button>
                  </div>
                </div>
                <div>
                  <p className={styles.product_title}>SubTotal</p>
                  <p className={styles.product_price}>$ {item.subtotal}</p>
                </div>
                <button className={styles.btn_delete} onClick={() => handleDelete(item)}><BsTrash3 className={styles.icon_delete} /></button>
              </div>
            )))
          }
          <div className={styles.cart_payment}>
            <h4>Detalle</h4>
            <div className={styles.cart_info}>
              <span className={styles.cart_products}>
                Cant. de productos
              </span>
              <span className={styles.cart_products}>
                {carrito[0]?.detalle_carritos.reduce((acc, item) => acc + parseInt(item.cantidad), 0)}
              </span>
              <span className={styles.cart_total_title}>
                Total
              </span>
              <span className={styles.cart_total}>
                $ {carrito[0]?.total}
              </span>
            </div>
            <div>
              <button className={styles.btn_paypal} onClick={handlePayButtonClick}>
                Pagar con <FaPaypal /> PayPal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
