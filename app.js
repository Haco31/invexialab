// acción para el menú hamburguesa

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
    });
});

// acción para los formularios

//[==================Formulario-1===============]
//Implementación para formulario en google sheets.
document.addEventListener('DOMContentLoaded', () => {
    const contactoForm = document.querySelector('.hero-form-card form');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbySeGcVBwBYp3oXMGFz2qr6wiI7nM3CSGriR6VM4IAqlNfVIRWlluvUuP_kSGHvqxYo/exec';
    // Aquí la URL

    if (contactoForm) {
        contactoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const boton = this.querySelector('button');
            const textoOriginal = boton.textContent;
            boton.textContent = 'Enviando...';
            boton.disabled = true;

            // Enviamos los datos usando POST
            fetch(scriptURL, {
                method: 'POST',
                body: new FormData(contactoForm)
            })
                .then(response => {
                    alert('¡Datos guardados con éxito en nuestra base de datos!');
                    contactoForm.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Hubo un error al guardar los datos.');
                })
                .finally(() => {
                    boton.textContent = textoOriginal;
                    boton.disabled = false;
                });
        });
    }
});


//[==================Formulario-2===============]
//Implementación para formulario en google sheets.
document.addEventListener('DOMContentLoaded', () => {
    const contactoForm = document.querySelector('.formulario-card form');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbySeGcVBwBYp3oXMGFz2qr6wiI7nM3CSGriR6VM4IAqlNfVIRWlluvUuP_kSGHvqxYo/exec';
    // Aquí la URL

    if (contactoForm) {
        contactoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const boton = this.querySelector('button');
            const textoOriginal = boton.textContent;
            boton.textContent = 'Enviando...';
            boton.disabled = true;

            // Enviamos los datos usando POST
            fetch(scriptURL, {
                method: 'POST',
                body: new FormData(contactoForm)
            })
                .then(response => {
                    alert('¡Datos guardados con éxito en nuestra base de datos!');
                    contactoForm.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Hubo un error al guardar los datos.');
                })
                .finally(() => {
                    boton.textContent = textoOriginal;
                    boton.disabled = false;
                });
        });
    }
});

//===========campo número de telefono==========
// Seleccionamos el campo por su nombre o ID
const inputTelefono = document.querySelector('input[name="telefono"]');

inputTelefono.addEventListener('input', function () {
    // Reemplaza cualquier carácter que NO sea un número (0-9) con un vacío ""
    this.value = this.value.replace(/[^0-9]/g, '');
});