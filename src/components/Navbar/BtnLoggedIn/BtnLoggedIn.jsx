import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import styles from './style.module.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const BtnLoggedIn = (props) => {

    const handleClick = () => {
        localStorage.clear();
        Cookies.remove('user');
        Cookies.remove('token');
        window.location.reload();
    }
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className={styles.dropdownButton}>
                    Hola, {props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item ><Link to={'/settings/user'}>Mi Cuenta</Link></Dropdown.Item>
                    <Dropdown.Item href=""></Dropdown.Item>
                    <Dropdown.Item href=""></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className={styles.dropdownButton} onClick={handleClick}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default BtnLoggedIn