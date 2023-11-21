import * as Yup from "yup";

// Validaciones realizadas para el formulario con yup, tanto de campos obligatorios como min y max de caracteres:
const mySchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, "El nombre debe tener 3 caracteres como minimo")
        .max(25, "El máximo de caracteres es de 25")
        .required("Por favor, ingrese un nombre"),

    apellido: Yup.string()
        .min(3, "El apellido debe tener 3 caracteres como minimo")
        .max(25, "El máximo de caracteres es de 25")
        .required("Por favor, ingrese un apellido"),

    correo: Yup.string()
        .email("El email no es valido")
        .required("Por favor, ingrese un email"),

    dni: Yup.string()
        .matches(/^\d+$/, "Ingrese un DNI válido")
        .min(5, "El número es muy pequeño")
        .max(14, "El número es muy extenso")
        .required("Por favor, ingrese su número DNI"),

    direccion: Yup.string()
        .required("Por favor, ingrese una dirección"),
})

export default mySchema;