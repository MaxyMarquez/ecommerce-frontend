import React from 'react'
import style from './style.module.css'
import remera from '../../../assets/remera.png'
import pantalon from '../../../assets/pantalon.png'
import camisa from '../../../assets/camisa.png'
import campera from '../../../assets/campera.png'
import gorro from '../../../assets/gorro.png'
import accesorios from '../../../assets/accesorios.png'
import accesorios_mujer from '../../../assets/accesorios_mujer.png'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <>
            <div className={style.section}>
                <div className={style.container}>
                    <div className={style.aside}>
                        <h3>Hombres</h3>
                    </div>
                    <div className={style.grid}>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Remeras</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={remera} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Camisas</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={camisa} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Pantalones</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={pantalon} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Camperas</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={campera} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Gorros</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={gorro} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Accesorios</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={accesorios} alt="" />
                        </Link>

                    </div>
                </div >

                <div className={style.container}>
                    <div className={style.aside_mujeres}>
                        <h3>Mujeres</h3>
                    </div>
                    <div className={style.grid}>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Remeras</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={remera} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Camisas</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={camisa} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Pantalones</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={pantalon} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Camperas</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={pantalon} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Gorros</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={pantalon} alt="" />
                        </Link>
                        <Link className={style.item_card}>
                            <div className='d-flex flex-column'>
                                <p>Accesorios</p>
                                <button className={style.btn_card}>Ver mas</button>
                            </div>
                            <img src={accesorios_mujer} alt="" />
                        </Link>

                    </div>
                </div >
            </div>
        </>
    )
}

export default Menu