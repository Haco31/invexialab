// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================
// URL de Google Apps Script (sirve para todos los formularios)
const scriptURL = 'https://script.google.com/macros/s/AKfycbySeGcVBwBYp3oXMGFz2qr6wiI7nM3CSGriR6VM4IAqlNfVIRWlluvUuP_kSGHvqxYo/exec';

// ==========================================
// MENÚ HAMBURGUESA
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
}


// ==========================================
// FUNCIÓN INTELIGENTE PARA ENVIAR FORMULARIOS
// ==========================================

function activarEnvioFormulario(selectorFormulario, idModalACerrar = null) {
    const form = document.querySelector(selectorFormulario);
    if (!form) return; // Si el formulario no existe en la página actual, ignora el bloque

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const boton = this.querySelector('button');
        const textoOriginal = boton ? boton.textContent : 'Enviar';
        
        if (boton) {
            boton.textContent = 'Enviando...';
            boton.disabled = true;
        }

        // Envia los datos a Google Sheets usando POST
        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            alert('¡Datos guardados con éxito en nuestra base de datos!');
            form.reset();
            
            // Se pasa el ID de un modal, lo cerramos automáticamente al terminar
            if (idModalACerrar) {
                const modal = document.getElementById(idModalACerrar);
                if (modal) modal.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Hubo un error al guardar los datos.');
        })
        .finally(() => {
            if (boton) {
                boton.textContent = textoOriginal;
                boton.disabled = false;
            }
        });
    });
}


// ==========================================
// FUNCIÓN INTELIGENTE PARA CONTROLAR MODALES
// ==========================================
// Esta función controla el abrir, cerrar con "X" y cerrar al dar clic afuera de cualquier modal
function controlarModal(claseBotonAbrir, idModal) {
    const botonesAbrir = document.querySelectorAll(claseBotonAbrir);
    const modal = document.getElementById(idModal);
    if (!modal) return;

    const botonCerrar = modal.querySelector('.close-modal');

    // 1. Abrir modal
    botonesAbrir.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    });

    // 2. Cerrar con la X
    if (botonCerrar) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // 3. Cerrar al hacer clic en el fondo oscuro
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}


// ==========================================
// EJECUCIÓN (Aquí es donde ocurre la magia)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ACTIVAR ENVIOS A GOOGLE SHEETS ---
    // Formularios normales fijados en la página (no cierran modales)
    activarEnvioFormulario('.hero-form-card form'); 
    activarEnvioFormulario('.formulario-card form'); 

    // Formularios dentro de los modales (envían datos y cierran su respectivo modal)
    activarEnvioFormulario('.formulario-card-investigacion form', 'modal-contacto-investigacion');
    activarEnvioFormulario('.formulario-card-startups form', 'modal-contacto-startups');
    activarEnvioFormulario('.formulario-card-experiencia form', 'modal-contacto-experiencia');


    // --- ACTIVAR APERTURA Y CIERRE DE MODALES ---
    // Conectamos cada clase de botón con el ID del modal que debe abrir
    controlarModal('.btn-investigacion', 'modal-contacto-investigacion');
    controlarModal('.btn-startups', 'modal-contacto-startups');
    controlarModal('.btn-experiencia', 'modal-contacto-experiencia');


    // --- VALIDACIÓN DE TELÉFONOS (Solo números) ---
    const inputsTelefono = document.querySelectorAll('input[name="telefono"]');
    inputsTelefono.forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

});

// ==========================================
// CARRUSEL INFINITO DE TESTIMONIOS (PC)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('testimoniosGrid');
    const btnPrev = document.getElementById('prevTestimonio');
    const btnNext = document.getElementById('nextTestimonio');

    if (grid && btnPrev && btnNext) {
        let enAnimacion = false;

        // Botón Siguiente
        btnNext.addEventListener('click', () => {
            if (enAnimacion) return;
            enAnimacion = true;

            // 1. Movemos el contenedor hacia la izquierda (mostrando la segunda tarjeta)
            grid.style.transition = "transform 0.6s ease-in-out"; // ← Ajusta la velocidad aquí (0.6s)
            grid.style.transform = "translateX(-100%)";

            // 2. Cuando termina la animación, pasamos la primera tarjeta al final
            grid.addEventListener('transitionend', function alTerminarSiguiente() {
                grid.removeEventListener('transitionend', alTerminarSiguiente);
                
                grid.style.transition = "none"; // Apagamos la animación un milisegundo
                grid.appendChild(grid.firstElementChild); // Movemos la primera tarjeta al final
                grid.style.transform = "translateX(0)"; // Reseteamos la posición del contenedor
                
                setTimeout(() => { enAnimacion = false; }, 50);
            });
        });

        // Botón Anterior
        btnPrev.addEventListener('click', () => {
            if (enAnimacion) return;
            enAnimacion = true;

            // 1. Antes de animar, movemos la última tarjeta al inicio para tener qué mostrar a la izquierda
            grid.style.transition = "none";
            grid.insertBefore(grid.lastElementChild, grid.firstElementChild);
            grid.style.transform = "translateX(-100%)";

            // 2. Forzamos al navegador a procesar el cambio y luego animamos hacia el centro (0)
            setTimeout(() => {
                grid.style.transition = "transform 0.6s ease-in-out"; // ← Ajusta la velocidad aquí (0.6s)
                grid.style.transform = "translateX(0)";
            }, 20);

            grid.addEventListener('transitionend', function alTerminarAnterior() {
                grid.removeEventListener('transitionend', alTerminarAnterior);
                enAnimacion = false;
            });
        });
    }
});