import axios from 'axios';
import {React,  useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { LiaUserEditSolid } from "react-icons/lia";
import style from './style.module.css'

const UserData = () => {
    const [userData, setuserData] = useState({
        id: '',
        usuario: '',
        nombre: '',
        apellido: '',
        correo: '',
        dni: '',
        direccion: '',
        telefono: ''
    });

    const [acount, setAcount] = useState(false);

    const handleEdit = () => {
        setAcount(!acount);
    }
    const handleCancel = () => {
        setAcount(!acount);
    }

    const handleSave = async () => {
        try {
            const response = await axios.post('/usuarios/update', userData)
            if (response.status === 200) {
                Swal.fire({
                    title: 'Datos Guardados con Exito',
                    icon: 'success'
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    title: 'Error al Guardar los Datos',
                    icon: 'error'
                })
            }
        } catch (error) {
            console.error(error);
        }
        setAcount(!acount);
    }

    const handleChange = (event) => {
        setuserData({
            ...userData,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(() => {
        const userfetch = async () => {
            const { data } = await axios.get(`/usuarios/${localStorage.getItem('id')}`)
            setuserData({
                id: data.data?.id,
                usuario: data.data?.usuario,
                nombre: data.data?.persona?.nombre,
                apellido: data.data?.persona?.apellido,
                correo: data.data?.persona?.correo,
                dni: data.data?.persona?.dni,
                direccion: data.data?.persona?.direccion,
                telefono: data.data?.persona?.telefono
            })
        }
        userfetch();
    }, []);

    return (
        <>
            <div className={style.container}>
                <div className={style.user}>
                    <h3 className={style.user_name}>{userData.usuario}</h3>
                    <h3>{userData.correo}</h3>
                </div>
                <div className={style.user_data}>
                    <div className={style.header_title}>
                        <h3 className={style.user_title}>Datos Personales</h3>
                        {
                            acount
                                ? (
                                    <div>
                                        <button className={style.btn_save} onClick={handleSave}>Guardar</button>
                                        <button className={style.btn_save} onClick={handleCancel}>Cancelar</button>
                                    </div>
                                ) : (
                                    <button className={style.btn_edit} onClick={handleEdit}>
                                        <LiaUserEditSolid className={style.edit_icon} />
                                    </button>
                                )
                        }
                    </div>
                    <div>
                        <div className={style.input_data}>
                            <div className={style.data_input}>
                                <label>Nombre</label>
                                <div>
                                    <input type="text"
                                        name='nombre'
                                        className={style.input}
                                        value={userData.nombre}
                                        onChange={handleChange}
                                        disabled={!acount}
                                    />
                                </div>
                            </div>
                            <div className={style.data_input}>
                                <label>Apellido</label>
                                <input type="text"
                                    name='apellido'
                                    className={style.input}
                                    value={userData.apellido}
                                    onChange={handleChange}
                                    disabled={!acount}
                                />

                            </div>
                        </div>
                        <div className={style.input_data}>
                            <div className={style.data_input}>
                                <label>Documento</label>
                                <input type="text"
                                    name='dni'
                                    className={style.input}
                                    value={userData.dni}
                                    onChange={handleChange}
                                    disabled={!acount}
                                />

                            </div>
                            <div className={style.data_input}>
                                <label>Teléfono</label>
                                <input type="text"
                                    name='telefono'
                                    className={style.input}
                                    value={userData.telefono}
                                    onChange={handleChange}
                                    disabled={!acount}
                                />
                            </div>
                        </div>
                        <div className={style.input_data}>
                            <div className={style.data_input}>
                                <label>Dirección</label>
                                <input type="text"
                                    name='direccion'
                                    className={style.input}
                                    value={userData.direccion}
                                    onChange={handleChange}
                                    disabled={!acount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserData