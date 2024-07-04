document.addEventListener('DOMContentLoaded', () => {
    const compras = JSON.parse(localStorage.getItem('compras')) || [];
    const listaCompras = document.getElementById('lista-compras');
    const nuevaCompraInput = document.getElementById('nueva-compra');
    const agregarBtn = document.getElementById('agregar-btn');
    const infoBtn = document.getElementById('info-btn');
    const info = document.getElementById('info');
    
    const guardarCompras = () => {
        localStorage.setItem('compras', JSON.stringify(compras));
    };

    const renderizarCompras = () => {
        listaCompras.innerHTML = '';
        compras.forEach((compra, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${compra}</span>
                <div>
                    <button class="btn-round btn-secondary btn-sm mr-2" onclick="editarCompra(${index})">Editar</button>
                    <button class="btn-round btn-danger btn-sm" onclick="eliminarCompra(${index})">Eliminar</button>
                </div>
            `;
            listaCompras.appendChild(li);
        });
    };

    agregarBtn.addEventListener('click', () => {
        const nuevaCompra = nuevaCompraInput.value.trim();
        if (nuevaCompra) {
            compras.push(nuevaCompra);
            nuevaCompraInput.value = '';
            guardarCompras();
            renderizarCompras();
        }
    });

    window.eliminarCompra = (index) => {
        compras.splice(index, 1);
        guardarCompras();
        renderizarCompras();
    };

    window.editarCompra = (index) => {
        const nuevaCompra = prompt('Editar producto:', compras[index]);
        if (nuevaCompra !== null) {
            compras[index] = nuevaCompra;
            guardarCompras();
            renderizarCompras();
        }
    };

    infoBtn.addEventListener('click', () => {
        info.classList.toggle('d-block');
    });

    renderizarCompras();
});


