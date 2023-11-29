import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsBag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import Cookies from 'js-cookie';
import style from './style.module.css'
import Login from './Login/Login'
import BtnLoggedIn from './BtnLoggedIn/BtnLoggedIn'
import axios from 'axios'
import Favorites from '../Favorites/Favorites'
import { getCarrito, getFavorites } from '../../../redux/actions'
import { useCookies } from 'react-cookie';
import logo from '../../../assets/logo.png'

const NavBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favorites = useSelector(state => state.favorites);
    const carrito = useSelector(state => state.carrito);

    const [show, setShow] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [cookies, setCookie] = useCookies(['']);

    const toggleLogin = () => {
        setShow(!show);
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const queryParams = search ? `?nombre=${encodeURIComponent(search)}` : '';
        const url = `/product_list/${queryParams}`;
        setSearch(search);
        navigate(url);
    };

    useEffect(() => {
        // const token = Cookies.get('token');
        // const userData = Cookies.get('user')

        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/usuarios/${localStorage.getItem('id')}`);
                setUser(data.data);
                localStorage.setItem('id_carrito', data.data?.carritos[0]?.id)
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };
        fetchUser();
        // if (userData) {
        //     // const parsedUser = JSON.parse(userData);
        //     // localStorage.setItem('token', token);
        //     // localStorage.setItem('id', parsedUser.id);
        // }

        if (localStorage.getItem('id')) dispatch(getFavorites(localStorage.getItem('id')))
        if (localStorage.getItem('id')) dispatch(getCarrito(localStorage.getItem('id')))

        const params = new URLSearchParams(location.search);
        setSearch(params.get('nombre') || search);

        setCookie('token')
        setCookie('user')
    }, [dispatch, props.datos]);


    return (
        <>
            <nav className={style.nav_container}>
                <div className='container'>
                    <div className={style.nav_header}>
                        <Link to={'/'} className={style.nav_logo}>
                            <picture>
                                <img src={logo} alt="Trendy_shop_logo" />
                            </picture>
                            <h6>Trendy Shop</h6>
                        </Link>
                        <form className={style.nav_search} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder='Buscar...'
                            />
                            <button className={style.btn_search} type='submit'><BsSearch /></button>
                        </form>
                        <div className={style.nav_icons}>
                            {
                                localStorage.getItem('token')
                                    ? <BtnLoggedIn name={user?.persona?.nombre} />
                                    : <Link className={style.nav_login} to={''} onClick={() => setShow(!show)}>INICIAR SESI&#211;N</Link>
                            }
                            <Link
                                className={`${style.nav_icon} ${style.nav_menu}`} to={''}
                                onClick={() => setOpen(!open)}
                            >
                                <AiOutlineMenu />
                            </Link>
                        </div>
                    </div>
                    <div className={`${style.nav_links_container} ${open ? style.open : style.close}`}>
                        <div className={style.nav_links}>
                            <Link className={style.nav_link} to={'/'}>Inicio</Link>
                            <Link className={style.nav_link} to={'/product_list'}>Tienda</Link>
                            <Link className={style.nav_link} to={'/about_us'}>Sobre Nosotros</Link>
                            <Link className={style.nav_link} to={''}>Contacto</Link>
                        </div>
                        <div className={style.nav_icon_container}>
                            <div className={style.fav_container}>
                                <Link className={style.nav_icon} to={''} onClick={() => setShowFavorites(!showFavorites)}>
                                    <BsHeart className={style.icon} />
                                    <span className={style.fav_count}>{favorites?.length}</span>
                                </Link>
                            </div>
                            <div className={style.fav_container}>
                                <Link className={style.nav_icon} to={'/cart'}>
                                    <BsBag className={style.icon} />
                                    <span className={style.fav_count}>{carrito[0] ? carrito[0]?.detalle_carritos?.reduce((acc, item) => acc + parseInt(item.cantidad), 0) : 0}</span>
                                </Link>
                                <span className={style.total}> {carrito[0]?.detalle_carritos?.length > 0 ? `$ ${carrito[0]?.total}` : ''}</span>
                            </div>
                        </div>
                    </div>
                </div >
            </nav>
            <Login show={show} toggleLogin={toggleLogin} />
            <Favorites show={showFavorites} toggleFavorites={toggleFavorites} />
        </>
    )
}

export default NavBar