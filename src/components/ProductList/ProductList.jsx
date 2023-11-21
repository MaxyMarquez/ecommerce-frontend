import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import NavBar from '../LandingPage/Navbar/NavBar';
import Newsletter from '../LandingPage/Newsletter/Newsletter';
import Footer from '../LandingPage/Footer/Footer';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import './ProducsList.css';
import { buscarProductos, getAllCategories, getAllProducts, sortProducts } from '../../redux/actions';
import { Accordion } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BiDetail } from "react-icons/bi";
import { BsBag, BsBagPlus, BsPlusLg } from "react-icons/bs";
import { BsHeart } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Favorites from '../LandingPage/Favorites/Favorites';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [precioMax, setPrecioMax] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [sortPrice, setSortPrice] = useState('');
  const [show, setShow] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.id;

    if (selectedCategories.includes(checkboxValue)) {
      setSelectedCategories(selectedCategories.filter(category => category !== checkboxValue));
    } else {
      setSelectedCategories([...selectedCategories, checkboxValue]);
    }
  };

  const toggleFavorites = () => {
    setShow(!show)
  }

  const handleAddFav = async (product) => {
    try {
      const { data } = await axios.post('/favoritos', {
        userId: localStorage.getItem('id'),
        productId: product.id,
      })
      if (!data.error) {
        Swal.fire({
          title: data.message,
          icon: 'success'
        }).then(() => {
          setShow(!show)
        })
      } else {
        Swal.fire({
          title: data.message,
          icon: 'success'
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCart = async (product) => {
    console.log(product);
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
        Swal.fire({
          title: 'Se añadio el producto al carrito',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtroNombre = params.get('nombre' || '');
    const categoria = params.get('categoria');
    setSearchActive(Boolean(filtroNombre || categoria || selectedCategories.length > 0));
    dispatch(getAllCategories());

    if (filtroNombre || categoria || selectedCategories.length > 0 || precioMin || precioMax) {
      dispatch(
        buscarProductos({
          nombre: filtroNombre || '',
          categoria: categoria || selectedCategories.join(','),
          precioMin: precioMin,
          precioMax: precioMax,
          page: currentPage
        })
      );
    } else {
      dispatch(getAllProducts(currentPage));
    }
    dispatch(sortProducts(sortPrice))
  }, [dispatch, location.search, selectedCategories, precioMax, precioMin, currentPage]);

  return (
    <>
      <NavBar />
      <div className="product-list container">

        <aside className='menu_search'>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categorias</Accordion.Header>
              <Accordion.Body className='accordion_body'>
                {
                  categories?.map(category => (
                    <div key={category.id}>
                      <input
                        type="checkbox"
                        name={category.nombre}
                        id={category.id}
                        className='category_input'
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={category.id}>{category.nombre}</label>
                    </div>
                  ))
                }
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Precio</Accordion.Header>
              <Accordion.Body className='accordion_price'>
                <input type="number" placeholder='Minimo' className='' min={0} onChange={(event) => setPrecioMin(event.target.value)} /> - <input type="number" placeholder='Maximo' className='' min={0} onChange={(event) => setPrecioMax(event.target.value)} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </aside>

        {(searchActive || (products.data && products.data.length > 0)) && (
          <ul>
            {products.data?.map((product) => (
              <div key={product.id} className="product-item">
                <div href={`/product_detail/${product.id}`} className='product-card'>
                  <picture>
                    <img src={product.img_productos[0]?.url} alt={product.nombre} />
                    <div className='btn_container'>
                      <button type='button' className='btn_cart' onClick={() => handleCart(product)}><BsBagPlus className='btn_icons' /></button>
                      <button type='button' className='btn_fav' onClick={() => handleAddFav(product)}><BsHeart className='btn_icons' /></button>
                      <a href={`/product_detail/${product.id}`} type='button' className='btn_detail'><BsPlusLg className='btn_icons' /></a>
                    </div>
                  </picture>
                  <div className="product-info">
                    <h3>{product.nombre}</h3>
                    <p className='product_category'>{product.categorium?.nombre}</p>
                    <h4 className='product-price'>$ {product.precio}</h4>
                    {/* <p className='product-orders'>
                      <span className='product-stock'>{`${product.stock} en Stock`}</span>
                      <VscDebugBreakpointLog className='icon-diamont' />
                      <span className='product-shipping'>Envio Gratis</span>
                    </p> */}
                    {/* <p className='product-description'>{product.descripcion}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
      <ReactPaginate
        previousLabel={<AiOutlineArrowLeft className='pagination-icon' />}
        nextLabel={<AiOutlineArrowRight className='pagination-icon' />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={products?.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selected) => handlePageChange(selected.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <Newsletter />
      <Footer />
      <Favorites show={show} toggleFavorites={toggleFavorites} />
    </>
  );
};

export default ProductList;
