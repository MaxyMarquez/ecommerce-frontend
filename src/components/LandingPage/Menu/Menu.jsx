import React from 'react'
import styles from './style.module.css'
import remera from '../../../assets/remera.png'
import calzado from '../../../assets/calzado.png'
import camisa from '../../../assets/camisa.png'
import campera from '../../../assets/campera.png'
import gorro from '../../../assets/gorro.png'
import accesorios from '../../../assets/accesorios.png'
import accesorios_mujer from '../../../assets/accesorios_mujer.png'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";

const Menu = () => {
    return (
        <>
            <div className={styles.container}>

                <Link to={'/product_list'} className={styles.menu_link}>
                    <div>
                        <p>Prendas</p>
                        <span>Ver mas <IoIosArrowRoundForward /></span>
                    </div>
                    <img src={remera} alt="" />
                </Link>
                <Link to={'/product_list'} className={styles.menu_link}>
                    <div>
                        <p>Accesorios</p>
                        <span>Ver mas <IoIosArrowRoundForward /></span>
                    </div>
                    <img src={gorro} alt="" />
                </Link>
                <Link to={'/product_list'} className={styles.menu_link}>
                    <div>
                        <p>Calzado</p>
                        <span>Ver mas <IoIosArrowRoundForward /></span>
                    </div>
                    <img src={calzado} alt="" />
                </Link>
                <Link to={'/product_list'} className={styles.menu_link}>
                    <div>
                        <p>Bolsos</p>
                        <span>Ver mas <IoIosArrowRoundForward /></span>
                    </div>
                    <img src={accesorios_mujer} alt="" />
                </Link>
            </div>
        </>
    )
}

export default Menu