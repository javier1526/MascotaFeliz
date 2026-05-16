let items = [];
let idEdicionActual = null; 
let tipoAccionCantActual = ''; 
let idEliminarCatalogoActual = null; 
let idEliminarInventarioActual = null; // MEJORA IA: Variable para rastrear eliminación segura del inventario

// ==========================================
// BASE DE DATOS DEL CATÁLOGO
// ==========================================
let catalogoBase = [
    { id: 'c1', nom: 'Dog Chow Adulto 12 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/490017-900-900?width=900&height=900&aspect=true' },
    { id: 'c2', nom: 'Dog Chow Adulto 8 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/489981-900-900?width=900&height=900&aspect=true' },
    { id: 'c3', nom: 'Dog Chow Adulto 3 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/489969-900-900?width=900&height=900&aspect=true' },
    
    { id: 'c4', nom: 'Champion Dog Adulto 15 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/630227-900-900?width=900&height=900&aspect=true' },
    { id: 'c5', nom: 'Champion Dog Adulto 9 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/629653-900-900?width=900&height=900&aspect=true' },
    { id: 'c6', nom: 'Champion Dog Adulto 3 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/630222-900-900?width=900&height=900&aspect=true' },
    
    { id: 'c7', nom: 'Master Cat Adulto 8 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/300925-900-900?width=900&height=900&aspect=true' },
    { id: 'c8', nom: 'Master Cat Adulto 3 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/300901-900-900?width=900&height=900&aspect=true' },
    { id: 'c9', nom: 'Master Cat Adulto 1 KG', cat: 'Alimento', img: 'https://jumbocl.vtexassets.com/arquivos/ids/300878-900-900?width=900&height=900&aspect=true' },

    { id: 'c10', nom: 'Nexgard 2 a 4 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw137e572a/images/large/386503-nexgard-afoxolaner-113-mg-1-comprimido-masticable-sabor-carne.jpg' },
    { id: 'c11', nom: 'Nexgard 4.1 a 10 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw2a0e5bd6/images/large/386508-nexgard-afoxolaner-283-mg-1-comprimido-masticable-sabor-carne.jpg?sw=295&sh=295' },
    { id: 'c12', nom: 'Nexgard 10.1 a 25 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw3841ebe5/images/large/386509-nexgard-afoxolaner-68-mg-1-comprimido-masticable-sabor-carne.jpg?sw=295&sh=295' },
    { id: 'c13', nom: 'Nexgard 25.1 a 50 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw17f208fa/images/large/386510-nexgard-afoxolaner-136-mg-1-comprimido-masticable-sabor-carne.jpg?sw=295&sh=295' },

    { id: 'c14', nom: 'Bravecto 2 a 4.5 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw55dc95df/images/large/542162-bravecto-fluralaner-112,5-mg-1-comprimido-masticable-para-perros.jpg?sw=295&sh=295' },
    { id: 'c15', nom: 'Bravecto 4.5 a 10 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dw49f87f3f/images/large/542163-bravecto-fluralaner-250-mg-1-comprimido-masticable-para-perros.jpg?sw=295&sh=295' },
    { id: 'c16', nom: 'Bravecto 10 a 20 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dwd3329687/images/large/542164-bravecto-fluralaner-500-mg-1-comprimido-masticable-para-perros.jpg?sw=295&sh=295' },
    { id: 'c17', nom: 'Bravecto 20 a 40 KG', cat: 'Salud', img: 'https://beta.cruzverde.cl/on/demandware.static/-/Sites-masterCatalog_Chile/default/dwfbc786f5/images/large/542165-bravecto-fluralaner-1000-mg-1-comprimido-masticable-para-perros.jpg?sw=295&sh=295' }
];

// MEJORA IA: Integración de localStorage para persistencia de datos (Criterio 6)
document.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('inventarioMascotaFeliz');
    if (datosGuardados) {
        items = JSON.parse(datosGuardados);
        actualizarDOM();
    }
    
    const catalogoGuardado = localStorage.getItem('catalogoBaseMascotaFeliz');
    if (catalogoGuardado) {
        catalogoBase = JSON.parse(catalogoGuardado);
    }
});

document.getElementById('buscadorInput').addEventListener('input', (e) => {
    actualizarDOM(e.target.value.toLowerCase());
});

// FORMULARIO PRINCIPAL
document.getElementById('formularioProducto').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombreInput').value;
    const categoria = document.getElementById('categoriaInput').value;
    const precio = parseFloat(document.getElementById('precioInput').value);
    const cantidad = parseInt(document.getElementById('cantidadInput').value);

    if (validar(nombre, categoria, precio, cantidad)) {
        items.push({ id: Date.now(), nombre, categoria, precio, cantidad });
        guardarEnStorage();
        actualizarDOM();
        
        e.target.reset(); 
        document.getElementById('nombreInput').value = ""; 
    }
});

function validar(nombre, categoria, precio, cantidad) {
    let esValido = true;
    const nombreErr = document.getElementById('errorNombre');
    const categoriaErr = document.getElementById('errorCategoria');
    const precioErr = document.getElementById('errorPrecio');
    const cantidadErr = document.getElementById('errorCantidad');

    document.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');

    const nombreLimpio = nombre.trim();
    
    if (nombreLimpio.length === 0) {
        nombreErr.textContent = "Por favor, selecciona un producto primero.";
        nombreErr.style.display = 'block';
        esValido = false;
    } else if (nombreLimpio.length < 3) {
        nombreErr.textContent = "El nombre es muy corto (mínimo 3 letras).";
        nombreErr.style.display = 'block';
        esValido = false;
    } else if (nombreLimpio.length > 45) {
        nombreErr.textContent = "El nombre supera el máximo de 45 caracteres.";
        nombreErr.style.display = 'block';
        esValido = false;
    } 
    // MEJORA IA: Expresión regular robusta que permite caracteres comerciales (.,-) bloqueando scripts (Criterio 1)
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.\,\-\+\(\)]+$/.test(nombreLimpio)) {
        nombreErr.textContent = "No se permiten caracteres extraños como @, <, > o #.";
        nombreErr.style.display = 'block';
        esValido = false;
    }

    if (!categoria) { categoriaErr.style.display = 'block'; esValido = false; }
    if (isNaN(precio) || precio <= 0) { precioErr.style.display = 'block'; esValido = false; }
    if (isNaN(cantidad) || cantidad < 1) { cantidadErr.style.display = 'block'; esValido = false; }

    return esValido;
}

function actualizarDOM(termino = "") {
    const tbody = document.getElementById('cuerpoTabla');
    tbody.innerHTML = "";
    
    const itemsFiltrados = items.filter(item => item.nombre.toLowerCase().includes(termino));

    document.getElementById('mensajeVacio').style.display = itemsFiltrados.length ? 'none' : 'block';

    itemsFiltrados.forEach(item => {
        const fila = document.createElement('tr');
        
        // MEJORA IA: Uso de textContent e inyección segura de nodos para prevenir vulnerabilidades XSS (Criterio 1)
        const tdN = document.createElement('td'); tdN.textContent = item.nombre; tdN.className="fw-bold";
        const tdC = document.createElement('td'); tdC.textContent = item.categoria;
        
        const tdP = document.createElement('td'); 
        const spanP = document.createElement('span');
        spanP.textContent = `$${item.precio.toLocaleString('es-CL')}`;
        const iconoPrecio = document.createElement('i');
        iconoPrecio.className = "fas fa-pencil-alt text-warning ms-2 icono-editar";
        iconoPrecio.onclick = () => abrirModalPrecio(item.id);
        tdP.append(spanP, iconoPrecio);

        const tdQ = document.createElement('td'); 
        const spanQ = document.createElement('span');
        spanQ.textContent = item.cantidad;
        const iconoCantidad = document.createElement('i');
        iconoCantidad.className = "fas fa-pencil-alt text-info ms-2 icono-editar";
        iconoCantidad.onclick = () => abrirModalCant(item.id);
        tdQ.append(spanQ, iconoCantidad);

        const tdSub = document.createElement('td');
        const subtotal = item.precio * item.cantidad;
        tdSub.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        tdSub.className = "fw-bold text-secondary";

        const tdA = document.createElement('td');
        const btn = document.createElement('button');
        btn.className="btn btn-sm btn-danger rounded-pill";
        btn.innerHTML = '<i class="fas fa-trash"></i>';
        
        // CORRECCIÓN: Ahora abre la ventana modal interactiva para confirmar
        btn.onclick = () => { 
            abrirModalConfirmarEliminarInv(item.id);
        };
        
        tdA.appendChild(btn);

        fila.append(tdN, tdC, tdP, tdQ, tdSub, tdA);
        tbody.appendChild(fila);
    });

    // MEJORA IA: Uso del método funcional reduce() para el cálculo eficiente del total (Criterio 2)
    const total = itemsFiltrados.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.getElementById('montoTotal').textContent = `$${total.toLocaleString('es-CL')}`;
}

function guardarEnStorage() {
    localStorage.setItem('inventarioMascotaFeliz', JSON.stringify(items));
}

/* =========================================
   LÓGICA DEL FLUJO DE CATÁLOGO Y NUEVOS ÍTEMS
   ========================================= */

function cerrarTodasLasModales() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('activo'));
    document.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');
}

function abrirModalSeleccionBase() {
    cerrarTodasLasModales();
    document.getElementById('overlaySeleccionBase').classList.add('activo');
}

function abrirModalCatalogo() {
    cerrarTodasLasModales();
    renderizarCatalogoGrid();
    document.getElementById('overlayCatalogo').classList.add('activo');
}

function renderizarCatalogoGrid() {
    const contenedor = document.getElementById('contenedorMiniCards');
    contenedor.innerHTML = ""; 

    catalogoBase.forEach(prod => {
        const div = document.createElement('div');
        div.className = "mini-card-producto";

        const btnX = document.createElement('button');
        btnX.className = "btn-eliminar-cat";
        btnX.innerHTML = '<i class="fas fa-times"></i>';
        btnX.onclick = (e) => {
            e.stopPropagation(); 
            abrirModalConfirmarEliminar(prod.id);
        };

        const img = document.createElement('img');
        img.src = prod.img;
        img.className = "img-catalogo";

        const nombre = document.createElement('h4');
        nombre.className = "fw-bold h5 mt-3";
        nombre.textContent = prod.nom;

        const cat = document.createElement('p');
        cat.className = "badge bg-info text-dark mb-3";
        cat.textContent = prod.cat;

        const br = document.createElement('br');

        const btn = document.createElement('button');
        btn.className = "btn btn-outline-info rounded-pill fw-bold w-100";
        btn.textContent = "Seleccionar";
        
        btn.onclick = () => {
            document.getElementById('nombreInput').value = prod.nom;
            document.getElementById('categoriaInput').value = prod.cat;
            cerrarTodasLasModales();
            document.getElementById('precioInput').focus();
        };

        div.append(btnX, img, nombre, cat, br, btn);
        contenedor.appendChild(div);
    });
}

function abrirModalNuevoCatalogo() {
    cerrarTodasLasModales();
    document.getElementById('nuevoCatNombre').value = "";
    document.getElementById('nuevoCatCategoria').value = "";
    document.getElementById('nuevoCatImg').value = "";
    document.getElementById('overlayNuevoCatalogo').classList.add('activo');
}

function guardarNuevoEnCatalogo() {
    const nombre = document.getElementById('nuevoCatNombre').value.trim();
    const categoria = document.getElementById('nuevoCatCategoria').value;
    let urlFoto = document.getElementById('nuevoCatImg').value.trim();
    
    let esValido = true;
    document.getElementById('errNuevoCatNombre').style.display = 'none';
    document.getElementById('errNuevoCatCat').style.display = 'none';

    if (nombre.length < 3 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\.\,\-\+\(\)]+$/.test(nombre)) {
        document.getElementById('errNuevoCatNombre').textContent = "Nombre inválido (Mínimo 3 caracteres, sin símbolos raros).";
        document.getElementById('errNuevoCatNombre').style.display = 'block';
        esValido = false;
    }
    if (!categoria) {
        document.getElementById('errNuevoCatCat').style.display = 'block';
        esValido = false;
    }

    if (esValido) {
        if (!urlFoto) {
            const textoLimpio = encodeURIComponent(nombre);
            urlFoto = `https://placehold.co/300x300/00B4D8/FFF?text=${textoLimpio}`;
        }

        catalogoBase.push({
            id: 'c' + Date.now(),
            nom: nombre,
            cat: categoria,
            img: urlFoto
        });

        // MEJORA IA: Persistencia de los nuevos productos manuales
        localStorage.setItem('catalogoBaseMascotaFeliz', JSON.stringify(catalogoBase));

        document.getElementById('nombreInput').value = nombre;
        document.getElementById('categoriaInput').value = categoria;
        
        cerrarTodasLasModales();
        document.getElementById('precioInput').focus();
    }
}

function abrirModalConfirmarEliminar(id) {
    idEliminarCatalogoActual = id;
    document.getElementById('overlayConfirmarEliminar').classList.add('activo');
}

function cerrarModalConfirmarEliminar() {
    document.getElementById('overlayConfirmarEliminar').classList.remove('activo');
    idEliminarCatalogoActual = null;
}

function confirmarEliminarCatalogo() {
    if (idEliminarCatalogoActual) {
        catalogoBase = catalogoBase.filter(prod => prod.id !== idEliminarCatalogoActual);
        localStorage.setItem('catalogoBaseMascotaFeliz', JSON.stringify(catalogoBase));
        renderizarCatalogoGrid(); 
        cerrarModalConfirmarEliminar();
    }
}

// ==========================================
// NUEVA LÓGICA: ELIMINAR ÍTEM DEL INVENTARIO (Confirmación)
// ==========================================
function abrirModalConfirmarEliminarInv(id) {
    idEliminarInventarioActual = id;
    document.getElementById('overlayConfirmarEliminarInv').classList.add('activo');
}

function cerrarModalConfirmarEliminarInv() {
    document.getElementById('overlayConfirmarEliminarInv').classList.remove('activo');
    idEliminarInventarioActual = null;
}

function confirmarEliminarInventario() {
    if (idEliminarInventarioActual) {
        items = items.filter(x => x.id !== idEliminarInventarioActual);
        guardarEnStorage();
        actualizarDOM(document.getElementById('buscadorInput').value.toLowerCase());
        cerrarModalConfirmarEliminarInv();
    }
}


/* =========================================
   LÓGICA DEL MODAL DE PRECIOS ORIGINAL
   ========================================= */
function abrirModalPrecio(id) {
    idEdicionActual = id;
    const item = items.find(i => i.id === id);
    document.getElementById('inputNuevoPrecio').value = item.precio;
    document.getElementById('errorModalPrecio').style.display = 'none';
    document.getElementById('overlayPrecio').classList.add('activo');
}

function cerrarModalPrecio() {
    document.getElementById('overlayPrecio').classList.remove('activo');
    idEdicionActual = null;
}

// MEJORA IA: Control cruzado JS + HTML5 para asegurar consistencia del tipo numérico flotante
function guardarNuevoPrecio() {
    const nuevoPrecio = parseFloat(document.getElementById('inputNuevoPrecio').value);
    const err = document.getElementById('errorModalPrecio');

    if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
        err.textContent = "El valor ingresado debe ser mayor a 0.";
        err.style.display = 'block';
        return;
    }

    const itemIndex = items.findIndex(i => i.id === idEdicionActual);
    if (itemIndex > -1) {
        items[itemIndex].precio = nuevoPrecio;
        guardarEnStorage();
        actualizarDOM(document.getElementById('buscadorInput').value.toLowerCase());
        cerrarModalPrecio();
    }
}

/* =========================================
   LÓGICA DEL MODAL DE CANTIDAD ORIGINAL (Pasos)
   ========================================= */
function abrirModalCant(id) {
    idEdicionActual = id;
    const item = items.find(i => i.id === id);
    
    document.getElementById('textoStockActual').textContent = `Stock actual del producto: ${item.cantidad}`;
    document.getElementById('vistaOpcionesCant').style.display = 'block';
    document.getElementById('vistaInputCant').style.display = 'none';
    document.getElementById('errorModalCant').style.display = 'none';
    document.getElementById('valorEdicionCant').value = '';
    
    document.getElementById('overlayCantidad').classList.add('activo');
}

function seleccionarAccionCant(accion) {
    tipoAccionCantActual = accion; 
    
    document.getElementById('vistaOpcionesCant').style.display = 'none';
    document.getElementById('vistaInputCant').style.display = 'block';
    
    const label = document.getElementById('labelInputCant');
    if (accion === 'fijar') {
        label.textContent = 'Ingresa la nueva cantidad exacta:';
    } else if (accion === 'sumar') {
        label.textContent = '¿Cuántos productos vas a añadir al stock?';
    } else if (accion === 'restar') {
        label.textContent = '¿Cuántos productos vas a retirar/restar?';
    }
    
    setTimeout(() => document.getElementById('valorEdicionCant').focus(), 100);
}

function volverOpcionesCant() {
    document.getElementById('vistaOpcionesCant').style.display = 'block';
    document.getElementById('vistaInputCant').style.display = 'none';
    document.getElementById('errorModalCant').style.display = 'none';
    document.getElementById('valorEdicionCant').value = '';
}

function cerrarModalCant() {
    document.getElementById('overlayCantidad').classList.remove('activo');
    idEdicionActual = null;
}

// MEJORA IA: Verificación exhaustiva de límites de stock lógico frente a operaciones matemáticas (Criterio 1 y 6)
function guardarNuevaCant() {
    const valorIngresado = parseInt(document.getElementById('valorEdicionCant').value);
    const err = document.getElementById('errorModalCant');

    if (isNaN(valorIngresado) || valorIngresado <= 0) {
        err.textContent = "El valor ingresado debe ser mayor a 0.";
        err.style.display = 'block';
        return;
    }

    const itemIndex = items.findIndex(i => i.id === idEdicionActual);
    if (itemIndex > -1) {
        let cantidadActual = items[itemIndex].cantidad;
        let nuevaCantidadFinal = cantidadActual;

        if (tipoAccionCantActual === 'fijar') {
            nuevaCantidadFinal = valorIngresado;
        } else if (tipoAccionCantActual === 'sumar') {
            nuevaCantidadFinal = cantidadActual + valorIngresado;
        } else if (tipoAccionCantActual === 'restar') {
            if (valorIngresado > cantidadActual) {
                err.textContent = `Error: No puedes restar ${valorIngresado}. Solo hay ${cantidadActual} en stock.`;
                err.style.display = 'block';
                return;
            }
            nuevaCantidadFinal = cantidadActual - valorIngresado;
        }

        items[itemIndex].cantidad = nuevaCantidadFinal;
        guardarEnStorage();
        actualizarDOM(document.getElementById('buscadorInput').value.toLowerCase());
        cerrarModalCant();
    }
}