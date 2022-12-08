'use strict';

const tareas = [
  {
    id: 1,
    nombre: 'tarea1',
    fecha: '2022-09-02',
    prioridad: 'Alto',
    descripcion: 'la super tarea',
  },
];

const btnGuardar = document.getElementById('btnGuardar');
const inputNombreTarea = document.getElementById('inputNombreTarea');
const inputFechaTarea = document.getElementById('inputFechaTarea');
const inputPrioridad = document.getElementById('inputPrioridad');
const inputDescripcionTarea = document.getElementById('inputDescripcionTarea');
const resultTareas = document.getElementById('resultTareas');
const inputIdTarea = document.getElementById('inputIdTarea');
const btnLimpiar = document.getElementById('btnLimpiar');

document.addEventListener('DOMContentLoaded', function () {
  btnGuardar.addEventListener('click', (e) => {
    const valorNombreTarea = inputNombreTarea.value;
    const valorFechaTarea = inputFechaTarea.value;
    const valorPrioridad = inputPrioridad.value;
    const valorDescripcionTarea = inputDescripcionTarea.value;
    const valorIdTareaEditar = inputIdTarea.value;

    // verificar que no esten vacios
    const resultVerificacion = verificarValoresInputs(
      valorNombreTarea,
      valorFechaTarea,
      valorPrioridad,
      valorDescripcionTarea
    );

    if (!resultVerificacion) return;

    if (!valorIdTareaEditar) {
      // agregar tarea

      const nuevaTarea = {
        id: Math.floor(Math.random() * 10000),
        nombre: valorNombreTarea,
        fecha: valorFechaTarea,
        prioridad: valorPrioridad,
        descripcion: valorDescripcionTarea,
      };

      tareas.push(nuevaTarea);
    } else {
      // editar tarea

      const tareaEditar = tareas.find(
        (tarea) => tarea.id === parseInt(valorIdTareaEditar)
      );

      tareaEditar.nombre = valorNombreTarea;
      tareaEditar.fecha = valorFechaTarea;
      tareaEditar.prioridad = valorPrioridad;
      tareaEditar.descripcion = valorDescripcionTarea;

      const tareasSinEditar = tareas.filter(
        (tarea) => tarea.id !== parseInt(valorIdTareaEditar)
      );

      tareasSinEditar.push(tareaEditar);
      inputIdTarea.value = '';
    }

    armarTabla();
  });

  btnLimpiar.addEventListener('click', () => {
    inputNombreTarea.value = '';
    inputFechaTarea.value = '';
    inputPrioridad.value = '';
    inputDescripcionTarea.value = '';
  });

  armarTabla();
});

const verificarValoresInputs = (
  valorNombreTarea,
  valorFechaTarea,
  valorPrioridad,
  valorDescripcionTarea
) => {
  if (valorNombreTarea === '') {
    alert('El nombre de la tarea no puede estar vacio');
    return false;
  }

  if (valorFechaTarea === '') {
    alert('La fecha de la tarea no puede estar vacio');
    return false;
  }

  if (valorPrioridad === '') {
    alert('La prioridad de la tarea no puede estar vacio');
    return false;
  }

  if (valorDescripcionTarea === '') {
    alert('La descripcion de la tarea no puede estar vacio');
    return false;
  }

  return true;
};

const editarTarea = (idTarea) => {
  const tareaEditar = tareas.filter((tarea) => tarea.id === idTarea)[0];
  inputNombreTarea.value = tareaEditar.nombre;
  inputFechaTarea.value = tareaEditar.fecha;
  inputPrioridad.value = tareaEditar.prioridad;
  inputDescripcionTarea.value = tareaEditar.descripcion;
  inputIdTarea.value = idTarea;
};

const eliminarTarea = (idTarea) => {
  console.log(idTarea);

  const indexTareaEliminar = tareas.indexOf(
    (tarea) => tarea.id !== parseInt(idTarea)
  );
  tareas.splice(indexTareaEliminar, 1);
  armarTabla();
};

const armarTabla = () => {
  let tareasLista = '';

  tareas.forEach((tarea) => {
    tareasLista += `
                    <tr>
                      <th scope="row">${tarea.id}</th>
                      <td>${tarea.nombre}</td>
                      <td>${tarea.fecha}</td>
                      <td>${tarea.prioridad}</td>
                      <td>${tarea.descripcion}</td>
                      <td><button class="btn btn-success" onclick="editarTarea(${tarea.id})">Editar</button></td>
                      <td><button class="btn btn-danger" onclick="eliminarTarea(${tarea.id})">Eliminar</button></td>
                    </tr>
                    `;
  });

  resultTareas.innerHTML = tareasLista;
};
