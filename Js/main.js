
const form = document.getElementById('form-contacto');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', (e) => {
    const formData = {
        nombre: nombre.value,
        email: email.value,
        asunto: asunto.value,
        mensaje: mensaje.value
    };
    e.preventDefault();
    form.reset();
    document.getElementById('confirmacion').style.display = 'block';
    console.log(formData);


});





