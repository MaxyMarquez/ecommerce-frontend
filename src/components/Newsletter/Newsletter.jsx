import React from 'react'
import style from './style.module.css'

const Newsletter = () => {
    return (
        <>
            <div className={style.container}>
                <h3 className={style.h3}>Suscríbete a nuestro boletín de noticias</h3>
                <p className={style.p}>Recibe noticias diarias sobre próximas ofertas y promociones de nuestros productos.</p>
                <form className={style.form}>
                    <input className={style.input} type="email" placeholder='Correo' />
                    <button className={style.btn_submit} type='submit'>Subscribirse</button>
                </form>
            </div>
        </>
    )
}

export default Newsletter