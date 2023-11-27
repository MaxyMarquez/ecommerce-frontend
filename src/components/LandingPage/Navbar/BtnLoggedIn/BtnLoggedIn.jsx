import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './style.module.css'
import Cookies from 'js-cookie';

const BtnLoggedIn = (props) => {

    const logout = async () => {
        try {
            const { data } = await axios.get('/auth/logout');
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        localStorage.clear();
        Cookies.remove('user');
        Cookies.remove('token');
        logout();
        window.location.reload();

    }
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className={styles.dropdownButton}>
                    Hola, {props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/settings/user/profile">Mi Cuenta</Dropdown.Item>
                    <Dropdown.Item href="/settings/user/shopping">Mis Compras</Dropdown.Item>
                    <Dropdown.Item href="/settings/user/review">Mis Reseñas</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className={styles.logout} onClick={handleClick}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default BtnLoggedIn