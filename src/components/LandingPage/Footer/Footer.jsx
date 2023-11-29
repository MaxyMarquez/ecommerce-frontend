import React, { useState } from 'react'
import { BiLogoFacebook, BiLogoInstagram, BiLogoTiktok, BiLogoYoutube } from 'react-icons/bi'
import { RiTwitterXFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import google from '../../../assets/google_play.png'
import appStore from '../../../assets/app_store.png'
import style from './style.module.css'
import Swal from 'sweetalert2'
import Login from '../Navbar/Login/Login'
import logo from '../../../assets/logo.png'

const Footer = () => {

    const [show, setShow] = useState(false);

    const toggleLogin = () => {
        setShow(!show);
    };

    const handleClick = () => {
        Swal.fire({
            title: 'Proximamente...'
        })
    }

    const handleLogin = () => {
        if (localStorage.getItem('id')) {
            Swal.fire({
                title: 'Ya has iniciado sesion'
            })
        } else {
            setShow(!show)
        }
    }

    return (
        <>
            <Login show={show} toggleLogin={toggleLogin} />
            <footer className={style.footer}>
                <div className={style.social_media}>
                    <div className={style.logo_container}>
                        <picture className={style.picture}>
                            <img className={style.logo} src={logo} alt="Trendy_shop_logo" />
                            Trendy Shop
                        </picture>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, necessitatibus?</p>
                    </div>
                    <div >
                        <ul className={style.ul}>
                            <li className={style.li}><Link to={''} className={style.social_link}><BiLogoFacebook className={style.icon} /></Link></li>
                            <li className={style.li}><Link to={''} className={style.social_link}><BiLogoInstagram className={style.icon} /></Link></li>
                            <li className={style.li}><Link to={''} className={style.social_link}><RiTwitterXFill className={style.icon} /></Link></li>
                            <li className={style.li}><Link to={''} className={style.social_link}><BiLogoTiktok className={style.icon} /></Link></li>
                            <li className={style.li}><Link to={''} className={style.social_link}><BiLogoYoutube className={style.icon} /></Link></li>
                        </ul>
                    </div>
                </div>
                <div className={style.about}>
                    <p className={style.tittle}>Sobre nosotros</p>
                    <ul className={style.ul}>
                        <li><Link to={'/about_us'} className={style.link}>Sobre Nosotros</Link> </li>
                        <li><Link to={'/product_list'} className={style.link}>Nuestra Tienda</Link> </li>
                        <li><Link to={'/product_list'} className={style.link}>Categorias</Link> </li>
                        <li><Link to={''} className={style.link}>Blogs</Link></li>
                    </ul>

                </div>
                <div className={style.information}>
                    <p className={style.tittle}>Informaci&#243;n</p>
                    <ul className={style.ul}>
                        <li><Link to={''} className={style.link}>Centro de ayuda</Link></li>
                        <li><Link to={''} className={style.link}>Devoluciones</Link></li>
                        <li><Link to={''} className={style.link}>Envios</Link></li>
                        <li><Link to={''} className={style.link}>Contactanos</Link></li>
                    </ul>
                </div>
                <div className={style.information}>
                    <p className={style.tittle}>Usuario</p>
                    <ul className={style.ul}>
                        <li><Link to={''} className={style.link} onClick={handleLogin}>Iniciar Sesi&#243;n</Link></li>
                        <li><Link to={'/register'} className={style.link}>Registro</Link></li>
                        <li><Link to={''} className={style.link}>Configuraci&#243;n</Link></li>
                        <li><Link to={''} className={style.link}>Mis compras</Link></li>
                    </ul>
                </div>
                <div className={style.app_links}>
                    <p className={style.tittle}>Obten nuestra App</p>
                    <ul className={style.ul}>
                        <li><Link to={''} className={style.link} onClick={handleClick}><img src={google} alt="" /></Link></li>
                        <li><Link to={''} className={style.link} onClick={handleClick}><img src={appStore} alt="" /></Link></li>
                    </ul>
                </div>
            </footer >
        </>
    )
}

export default Footer