import {React,  useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./CreateProduct.module.css";
import Select from 'react-select';
import { getAllCategories, createProduct } from '../../redux/actions'; // Corregir el nombre de la función createProduct
import { useDispatch, connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import NavBar from '../LandingPage/Navbar/NavBar';


function CreateProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories)

  let dataToMap = [];

  if (categories.length) {
    dataToMap = [...categories];
  }

  const [dataProduct, setdataProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    id_categoria: "",
    id_statud: "",
    imagen: null, // Agregar el campo para la imagen
  });

  const handleChange = (event) => {
    if (event.target.name === 'imagen') {
      setdataProduct({
        ...dataProduct,
        [event.target.name]: event.target.files[0], // Tomar el archivo de la entrada de archivo
      });
    } else {
      setdataProduct({
        ...dataProduct,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', dataProduct.nombre);
    formData.append('descripcion', dataProduct.descripcion);
    formData.append('precio', dataProduct.precio);
    formData.append('stock', dataProduct.stock);
    formData.append('id_categoria', dataProduct.id_categoria);
    formData.append('id_statud', dataProduct.id_statud);
    formData.append('imagen', dataProduct.imagen);

    dispatch(createProduct(formData));

    Swal.fire(
      'Producto Creado!',
      'El producto fue creado exitosamente.',
      'success'
    ).then(() =>
      setdataProduct({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        id_categoria: "",
        id_statud: "",
        imagen: null,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);


  return (
    <main >
      <NavBar />
      <div className="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className='text-center'>Crear Producto</h1>
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
          <Form
            className={styles.container}
            onSubmit={(event) => onSubmit(event)}
            encType="multipart/form-data" // Configurar el tipo de contenido del formulario
          >
            <div className={styles.input_container}>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Nombre Del Producto" className="w-100">
                  <Form.Control
                    className={styles.form_input}
                    type="text"
                    placeholder="Nombre Del Producto"
                    name='nombre'
                    value={dataProduct.nombre}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

              </div>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Descripcion" className="w-100">
                  <Form.Control
                    className={styles.form_input}
                    as="textarea"
                    style={{ height: '150px' }}
                    placeholder="Descripcion"
                    name='descripcion'
                    value={dataProduct.descripcion}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Stock Disponible" className="w-50">
                  <Form.Control
                    className={styles.form_input}
                    type="number"
                    placeholder="Stock Disponible"
                    name='stock'
                    value={dataProduct.stock}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Valor del Producto" className="w-50">
                  <Form.Control
                    className={styles.form_input}
                    type="number"
                    placeholder="Valor del Producto"
                    name='precio'
                    value={dataProduct.precio}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                <Form.Label className='text-black'>Status Del Producto</Form.Label>
                <FloatingLabel controlId="floatingInput" label="Estado" className="w-100" >
                  <Form.Select aria-label="Default select example" value={dataProduct.id_statud} name='id_statud' onChange={event => handleChange(event)}>
                    <option>Selecciones un estado</option>
                    <option value="1">ACTIVO</option>
                    <option value="2">INACTIVO</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                <Form.Label className='text-black'>Categoria</Form.Label>
                <Select
                  className={styles.form_input}
                  isClearable
                  name='id_categoria'
                  options={dataToMap?.map(categorie => ({
                    value: categorie.id,
                    label: categorie.nombre
                  }))}
                  placeholder='Categoria'
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setdataProduct({ ...dataProduct, id_categoria: selectedOption.value });
                    } else {
                      setdataProduct({ ...dataProduct, id_categoria: '' });
                    }
                  }}
                  required
                />
              </Form.Group>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Imagen" className="w-100">
                  <Form.Control
                    className={styles.form_input}
                    type="file"
                    accept="image/*"
                    name='imagen'
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <Button className='w-100 my-4' variant="primary" type="submit">
                Crear Producto
              </Button>
            </div>
          </Form>
        </div >
        {/* /.content-wrapper */}
        < footer className="main-footer" >

        </footer >
        {/* Control Sidebar */}
        < aside className="control-sidebar control-sidebar-dark" >
          {/* Control sidebar content goes here */}
        </aside >
        {/* /.control-sidebar */}
      </div >
    </main>
  )
}

export default CreateProduct;
