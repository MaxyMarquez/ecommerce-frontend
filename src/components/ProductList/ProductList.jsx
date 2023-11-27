import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import NavBar from '../LandingPage/Navbar/NavBar';
import Newsletter from '../LandingPage/Newsletter/Newsletter';
import Footer from '../LandingPage/Footer/Footer';
import Favorites from '../LandingPage/Favorites/Favorites';
import { buscarProductos, getAllCategories, getAllProducts } from '../../redux/actions';
import { Accordion } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsBagPlus, BsPlusLg } from "react-icons/bs";
import { BsHeart } from 'react-icons/bs';
import Swal from 'sweetalert2';
import './ProducsList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [precioMax, setPrecioMax] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set('page', newPage);
    navigate(`${location.pathname}?${updatedParams.toString()}`);
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.id;

    let updatedCategories;

    if (selectedCategories.includes(checkboxValue)) {
      updatedCategories = selectedCategories.filter(category => category !== checkboxValue);
      setCurrentPage(1);
    } else {
      updatedCategories = [...selectedCategories, checkboxValue];
      setCurrentPage(1);
    }

    updatedCategories = updatedCategories.filter(category => category !== '');

    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set('categoria', updatedCategories.join(','));

    setSelectedCategories(updatedCategories);

    navigate(`${location.pathname}?${updatedParams.toString()}`);
  };

  const toggleFavorites = () => {
    setShow(!show)
  }

  const handleAddFav = async (product) => {
    try {
      const { data } = await axios.post('/favoritos', {
        userId: localStorage.getItem('id'),
        productId: product.id,
      });

      if (data.error) {
        setDatos(!datos);
        Swal.fire({
          title: data.message,
          icon: 'warning'
        });
      } else {
        Swal.fire({
          title: data.message,
          icon: 'success'
        }).then(() => {
          setShow(!show);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


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
        setDatos(!datos);
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

  useEffect(() => {
    const filtroNombre = params.get('nombre') || '';
    const categoria = params.get('categoria') || '';
    const selectedCategoriesFromUrl = categoria.split(',');

    setSearchActive(Boolean(filtroNombre || categoria || selectedCategoriesFromUrl.length > 0));
    dispatch(getAllCategories());

    if (filtroNombre || categoria || selectedCategoriesFromUrl.length > 0 || precioMin || precioMax) {
      dispatch(
        buscarProductos({
          nombre: filtroNombre,
          categoria: categoria,
          precioMin: precioMin,
          precioMax: precioMax,
          page: currentPage
        })
      );
      setSelectedCategories(selectedCategoriesFromUrl);
    } else {
      dispatch(getAllProducts(currentPage));
    }
    const pageParam = params.get('page') || '1'; // Obtén el valor del parámetro 'page' o establece el valor predeterminado en 1
    setCurrentPage(parseInt(pageParam, 10));
  }, [dispatch, location.search, precioMax, precioMin, currentPage]);


  return (
    <>
      <NavBar datos={datos} />
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
                        checked={selectedCategories.includes(String(category.id))}
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
              <div key={product.id} className="product-card">
                <picture>
                  <img src={product.img_productos[0]?.url} alt={product.nombre} />
                  <div className='btn_container'>
                    <button type='button' className='btn_cart' onClick={() => handleCart(product)}><BsBagPlus className='btn_icons' /></button>
                    <button type='button' className='btn_fav' onClick={() => handleAddFav(product)}><BsHeart className='btn_icons' /></button>
                    <Link to={`/product_detail/${product.id}`} type='button' className='btn_detail'><BsPlusLg className='btn_icons' /></Link>
                  </div>
                </picture>
                <div className="product-info">
                  <h3>{product.nombre}</h3>
                  <p className='product_category'>{product.categorium?.nombre}</p>
                  <h4 className='product-price'>$ {product.precio}</h4>
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
        forcePage={currentPage - 1}
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
