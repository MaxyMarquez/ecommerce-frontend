import React, { useState } from 'react'
import NavBar from '../LandingPage/Navbar/NavBar'
import style from './style.module.css'
import { Link, Navigate } from 'react-router-dom'
import { LuUserCog } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { BsBagCheck, BsPersonGear } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import UserData from './UserData/UserData';
import UserShopping from './UserShopping/UserShopping';
import UserReview from './UserReview/UserReview';



const UserPanel = () => {

    return (
        <>
            <div className={style.userPanel_container}>
                <aside className={style.container}>
                    <nav className={style.nav_container}>
                        <div className={style.nav_title_container}>
                            <label className={style.icon_container}><RiMenu2Line className={style.link_icon} /></label>
                            <h2 to={''} className={style.nav_title}> Mi Cuenta </h2>
                        </div>
                        <div className={style.nav_section}>
                            <label className={style.icon_container}><BsPersonGear className={style.link_icon} /></label>
                            <Link to="/settings/user/profile" className={style.nav_link} >
                                Mi Perfil <IoIosArrowForward className={style.icon_arrow} />
                            </Link>
                        </div>
                        <div className={style.nav_section}>
                            <label className={style.icon_container}><BsBagCheck className={style.link_icon} /></label>
                            <Link to="/settings/user/shopping" className={style.nav_link} >
                                Mis Compras <IoIosArrowForward className={style.icon_arrow} />
                            </Link>
                        </div>
                        <div className={style.nav_section}>
                            <label className={style.icon_container}><FaRegStar className={style.link_icon} /></label>
                            <Link to="/settings/user/review" className={style.nav_link}>
                                Review <IoIosArrowForward className={style.icon_arrow} />
                            </Link>
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    )
}

export default UserPanel