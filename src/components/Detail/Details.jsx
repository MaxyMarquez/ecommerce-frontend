import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import NavBar from '../LandingPage/Navbar/NavBar';
import Footer from '../LandingPage/Footer/Footer';
import Newsletter from '../LandingPage/Newsletter/Newsletter';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsBagPlus, BsChatRightDots, BsChatTextFill, BsCheck2, BsDiamondFill, BsHeart } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { agregarAlCarrito } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import ProductReviewsAndForm from '../LandingPage/Reviews/ProductReviews'; // Agrega esta línea
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userId = localStorage.getItem('id');
  const idCarrito = localStorage.getItem('id_carrito'); // Asegúrate de tener esto disponible

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [datos, setDatos] = useState(false);


  const totalPoints = reviews?.map(item => item.puntuacion).reduce((acc, val) => acc + val, 0);
  const totalStars = totalPoints / reviews.length

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/productos/${id}`);
        setProduct(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/productReviews/${id}`);
        setReviews(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    fetchReviews();
  }, [id]);

  const handleCart = async (product) => {
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product.precio,
      id_carrito: localStorage.getItem('id_carrito'),
      id_producto: product.id,
    }
    try {
      const { data } = await axios.post('/carrito/addItem', dataCart);

      if (!data.error) {
        setDatos(!datos)
        Swal.fire({
          title: 'Se añadio el producto al carrito',
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Debes iniciar sesión',
          icon: 'warning'
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar datos={datos} />
      {product && (

        <div className={styles.divContenido}>
          <div className={styles.container}>
            <div className={styles.divFoto}>
              <img className={styles.imagen} src={product?.img_productos?.[0]?.url} alt="img" />
            </div>
            <div className={styles.divProductoInfo}>
              <div className={styles.product_star}>

                <Rating
                  allowFraction
                  initialValue={totalStars || 0}
                  readonly={true}
                  size={20}
                  style={{ verticalAlign: 'initial' }}
                />
                <BsDiamondFill className={styles.icon_diamont} />
                <span className={styles.reviews_length}>
                  <BsChatTextFill />
                  <span>
                    {reviews?.length} reviews
                  </span>
                </span>
                <BsDiamondFill className={styles.icon_diamont} />

                {
                  product?.stock > 0 ? (
                    <span className={styles.inStock}>
                      <BsCheck2 /> en Stock
                    </span>
                  ) : (
                    <span><RxCross2 /> sin Stock</span>
                  )
                }
              </div>
              <h2 className={styles.tituloProducto}>{product.nombre}</h2>
              <p className={styles.price}>$ {product.precio}</p>
              <div className={styles.product_detail}>
                <p className={styles.pProductoInfo}>Categoría</p>
                <p className={styles.pProductoInfo}>{product.categoria?.map(cat => cat.nombre + ' ')}</p>
                <p className={styles.pProductoInfo}>Stock</p>
                <p className={styles.pProductoInfo}>{product.stock}
                </p>
                <p className={styles.pProductoInfo}>Descripción</p>
                <p className={styles.pProductoInfo}>{product.descripcion}</p>
              </div>
            </div>
            <div className={styles.divPanelDeCompra}>
              <div className={styles.divBotoneraCompra}>
                <button className={styles.botonCarrito} onClick={() => handleCart(product)}><BsBagPlus /> Añadir al Carrito</button>
                <button className={styles.botonFavorito}> <BsHeart />Añadir a Favoritos</button>
              </div>
            </div>
          </div>
        </div >
      )}
      <ProductReviewsAndForm id={id} />
      <div className={styles.reviews_container}>
        <h4>Reseñas de Usuarios</h4>
        {
          reviews && reviews?.map(review => (
            <div className={styles.reviews_card} key={review.id}>
              <div className={styles.reviews}>
                <span>{review?.usuario?.persona?.nombre} {review?.usuario?.persona?.apellido}</span>
                <Rating
                  allowFraction
                  initialValue={review.puntuacion}
                  readonly={true}
                  size={15}
                  style={{ verticalAlign: 'initial' }}
                />
              </div>
              <p>
                {review?.contenido}
              </p>
            </div>
          ))
        }
      </div>
      <Newsletter />
      <Footer />
    </>
  );
}
