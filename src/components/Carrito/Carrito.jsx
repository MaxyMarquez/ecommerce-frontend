import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarDelCarrito, getCarrito, actualizarCarrito } from '../../redux/actions';
import { BsPlusLg, BsDash, BsTrash3 } from "react-icons/bs";
import NavBar from '../LandingPage/Navbar/NavBar'
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './carrito.module.css';
import { FaPaypal } from "react-icons/fa";
import Swal from 'sweetalert2';

const Carrito = () => {
  const dispatch = useDispatch();

  const userId = parseInt(localStorage.getItem('id'));
  const idCarrito = parseInt(localStorage.getItem('id_carrito'));

  const carrito = useSelector(state => state.carrito);
  const [updateValue, setUpdateValue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handlePayButtonClick = async () => {
    try {
      if (!userId || !idCarrito) {
        console.error('ID de usuario o ID de carrito no encontrados. Usuario no autenticado o carrito no válido.');
        return;
      }
      const cart = await axios.get(`carrito/${userId}`);

      const cartStock = cart?.data?.data[0]?.detalle_carritos?.filter(cart => parseInt(cart.producto.stock) < 1)

      if (cartStock.length !== 0) {
        Swal.fire({
          title: `El/los producto "${cartStock[0]?.producto?.nombre}" no posee Stock disponiible`,
          text: 'Por favor elimine este producto para poder dealizar la compra',
          icon: 'error'
        })
        return;
      }



      const response = await axios.post('/pago/create-order', { id_user: userId, id_carrito: idCarrito });
      window.location.href = response?.data?.links[1].href;
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
    }
  };

  const handleItemAction = async (action, product) => {

    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    };
    try {
      const { data } = await axios.post(`/carrito/${action}`, dataCart);
      if (!data.error) {
        setUpdateValue(prev => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = async (product) => {
    if (parseInt(product.producto.stock) > 0 && parseInt(product.cantidad) < parseInt(product.producto.stock)) {
      handleItemAction('addItem', product);
    } else {
      Swal.fire({
        title: 'No hay suficiente stock disponible para agregar más unidades.',
        text: 'Por favor, ajusta la cantidad o elimina el producto del carrito.',
        icon: 'error'
      });
    }
  };

  const handleRemoveItem = async (product) => {
    handleItemAction('removeItem', product);
  };

  const handleDelete = async (product) => {
    handleItemAction('deleteItem', product);
  };

  useEffect(() => {
    if (userId) dispatch(getCarrito(userId));
  }, [dispatch, updateValue, Swal]);

  return (
    <>
      <NavBar />
      <div className='container'>
        <h2>Carrito de Compras</h2>
        <div className={styles.container}>
          {
            carrito && carrito[0]?.detalle_carritos?.map(item => (
              <div key={item.id} className={styles.product_item}>
                <picture className={styles.product_img}>
                  <img src={item.producto.img_productos[0].url} alt="" />
                </picture>
                <div className={styles.product_name}>
                  <p>{item.producto?.nombre}</p>
                </div>
                <div>
                  <p className={styles.product_title}>Stock</p>
                  <p className={styles.product_price}>{item.producto.stock > 0 ? item.producto.stock : 'Agotado'}</p>
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
                      value={(item.cantidad)}
                      disabled
                    />
                    <button
                      className={styles.btn_product}
                      onClick={() => handleAddItem(item)}
                      disabled={parseInt(item.cantidad) > parseInt(item.producto.stock)}
                    >
                      <BsPlusLg className={styles.btn_icon} />
                    </button>
                  </div>
                </div>
                <div>
                  <p className={styles.product_title}>SubTotal</p>
                  <p className={styles.product_price}>$ {Math.round(item.subtotal * 100) / 100}</p>
                </div>
                <button className={styles.btn_delete} onClick={() => handleDelete(item)}><BsTrash3 className={styles.icon_delete} /></button>
              </div>
            ))
          }
          <div className={styles.cart_payment}>
            <h4>Detalle</h4>
            <div className={styles.cart_info}>
              <span className={styles.cart_products}>
                Cant. de productos
              </span>
              <span className={styles.cart_products}>
                {carrito[0]?.detalle_carritos?.reduce((acc, item) => acc + parseInt(item.cantidad), 0)}
              </span>
              <span className={styles.cart_total_title}>
                Total
              </span>
              <span className={styles.cart_total}>
                $ {Math.round(carrito[0]?.total * 100) / 100}
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