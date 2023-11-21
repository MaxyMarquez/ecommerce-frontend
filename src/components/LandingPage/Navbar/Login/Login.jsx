import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Offcanvas } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import style from './style.module.css'
import Cookies from 'js-cookie'

const Login = (props) => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [user, setUser] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = userData;

        try {
            const { data } = await axios.post('/auth/login', {
                correo: email,
                password: password,
            });
            if (data.error) {
                Swal.fire({
                    title: data.message,
                    icon: 'error'
                })
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.data.id);
                localStorage.setItem('id_carrito', data.data.carritos[0].id);
                window.location.reload();
            }

        } catch (error) {
            console.log(error);
        };
    }

    useEffect(() => {
        const token = Cookies.get('token');
        const userData = Cookies.get('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            localStorage.setItem('token', token);
            localStorage.setItem('id', parsedUser.id);
            localStorage.setItem('id_carrito', parsedUser?.carritos[0]?.id);
        };
    }, [])

    return (
        <>
            <Offcanvas show={props.show} onHide={props.toggleLogin} placement='end' backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>INICIAR SESI&#211;N</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-2">
                            <Form.Control
                                className={style.input}
                                type="email"
                                placeholder="Email"
                                onChange={(event) => setUserData({ ...userData, email: event.target.value })}

                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Contraseña" className="mb-2">
                            <Form.Control
                                className={style.input}
                                type="password"
                                placeholder="Contraseña"
                                onChange={(event) => setUserData({ ...userData, password: event.target.value })}

                            />
                        </FloatingLabel>
                        <Button className={style.btn_login} type='submit' >
                            INICIAR SESIÓN
                        </Button>

                    </Form>
                    <Link className={style.btn_google} to='https://backend-dev-jnpc.1.us-1.fl0.io/api/auth/google' type="button">
                        <FcGoogle className={style.google_logo} />
                        Iniciar sesi&#243;n con Google
                    </Link>
                    <div className='d-flex flex-column'>
                        <p>¿Eres nuevo? <Link to={"/register"}>Registrarse!</Link></p>
                        <p>Ovidaste tu contraseña? <Link to={"#"}>Recuperar Contraseña</Link></p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Login