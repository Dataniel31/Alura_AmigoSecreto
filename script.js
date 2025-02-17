const agregarBtn = document.getElementById('agregarBtn');
const sortearBtn = document.getElementById('sortearBtn');
const nombreInput = document.getElementById('nombreInput');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

let amigos = [];
let nombreEditado = null; 
agregarBtn.addEventListener('click', () => {
  const nombre = nombreInput.value.trim(); 
  if (nombre === '') {
    alert('Por favor, ingresa un nombre válido.');
    return;
  }

  if (/^\d+$/.test(nombre)) {
    alert('El nombre no puede ser solo números.');
    return;
  }

  if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(nombre)) {
    alert('El nombre solo puede contener letras y espacios.');
    return;
  }

  const nombreNormalizado = nombre.toLowerCase();

  if (amigos.some(amigo => amigo.toLowerCase() === nombreNormalizado)) {
    alert('Este nombre ya está en la lista.');
    return;
  }

  if (nombreEditado !== null) {
    amigos[nombreEditado.index] = nombre;
    nombreEditado = null; 
  } else {
    amigos.push(nombre);
  }

  actualizarLista();
  nombreInput.value = '';
});

sortearBtn.addEventListener('click', () => {
  if (amigos.length === 0) {
    resultado.textContent = 'Agrega algunos nombres primero.';
    return;
  }

  const amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
  resultado.textContent = `Tu amigo secreto es: ${amigoSorteado}`;
});

function actualizarLista() {
  listaAmigos.innerHTML = '';
  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.textContent = amigo.charAt(0).toUpperCase() + amigo.slice(1);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      nombreInput.value = amigo; 
      nombreEditado = { index }; 
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      amigos.splice(index, 1); 
      actualizarLista(); 
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    listaAmigos.appendChild(li);
  });
}
