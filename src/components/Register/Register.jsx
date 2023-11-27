import React from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import validations from "./validations"
// React Bootstrap
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../LandingPage/Navbar/NavBar'
// Styles
import styles from './register.module.css'
import { userRegister } from '../../redux/actions';
import { useNavigate } from 'react-router';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (values, actions) => {

        const dataCliente = {
            usuario: values.nombre,
            password: values.password,
            data: {
                nombre: values.nombre,
                apellido: values.apellido,
                correo: values.correo,
                dni: values.dni,
                direccion: values.direccion,
                telefono: values.telefono,
            }
        }

        dispatch(userRegister(dataCliente));
        navigate("/");

        // swal("Registrado!");
        actions.resetForm()
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

        // Valores iniciales que vamos a tener en nuestro formulario
        initialValues: { nombre: "", apellido: "", dni: "", correo: "", password: "", telefono: "", direccion: "" },
        // Esquema de validaciones, que declaramos e importamos
        validationSchema: validations,
        // Funcion onSubmit que tomara el lugar en cualquier handleSubmit
        onSubmit
    })

    return (
        <>
            <Navbar />
            <h1 className='text-center m-5'>Registro</h1>
            <Form className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.input_container}>
                    <div className={styles.input_name}>

                        <FloatingLabel controlId="floatingInput" label="Nombre" className="w-100 me-2">
                            <Form.Control
                                className={styles.form_input}
                                type="text"
                                placeholder="Nombre"
                                name='nombre'
                                value={values.nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <div className={styles.errorContainer}>{errors.nombre && touched.nombre && <p className='errorText'>{errors.nombre}</p>}</div>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="Apellido" className="w-100 ">
                            <Form.Control
                                className={styles.form_input}
                                type="text"
                                placeholder="Apellido"
                                name='apellido'
                                value={values.apellido}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <div className={styles.errorContainer}>{errors.apellido && touched.apellido && <p className='errorText'>{errors.apellido}</p>}</div>
                        </FloatingLabel>
                    </div>
                    <div className={styles.input_name}>
                        <FloatingLabel controlId="floatingPassword" label="Número de Documento" className="w-100 me-2">
                            <Form.Control
                                className={styles.form_input}
                                type="text"
                                placeholder="Número de Documento"
                                name="dni"
                                value={values.dni}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <div className={styles.errorContainer}>{errors.dni && touched.dni && <p className='errorText'>{errors.dni}</p>}</div>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Teléfono (Opcional)" className="w-100">
                            <Form.Control
                                className={styles.form_input}
                                type="phone"
                                placeholder="Teléfono (Opcional)"
                                name="telefono"
                                value={values.telefono}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                    <div className={styles.input_name}>
                        <FloatingLabel controlId="floatingInput" label="Dirección" className="w-100">
                            <Form.Control
                                className={styles.form_input}
                                type="text"
                                placeholder="Dirección"
                                name="direccion"
                                value={values.direccion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <div className={styles.errorContainer}>{errors.direccion && touched.direccion && <p className='errorText'>{errors.direccion}</p>}</div>
                        </FloatingLabel>
                    </div>
                    <div className={styles.input_name}>
                        <FloatingLabel controlId="floatingInput" label="Email" className="w-100">
                            <Form.Control
                                className={styles.form_input}

                                type="email"
                                placeholder="name@example.com"
                                name="correo"
                                value={values.correo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <div className={styles.errorContainer}>{errors.correo && touched.correo && <p className='errorText'>{errors.correo}</p>}</div>
                        </FloatingLabel>

                    </div>
                    <div className={styles.input_name}>
                        <FloatingLabel controlId="floatingPassword" label="Contaseña" className="w-100">
                            <Form.Control
                                className={styles.form_input}
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                        </FloatingLabel>
                    </div>
                    <Button className='w-100 my-4' variant="primary" type="submit">
                        Crear Cuenta
                    </Button>
                </div>
            </Form >
        </>
    )
}

export default Register