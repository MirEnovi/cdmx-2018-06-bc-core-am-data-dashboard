document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded es un evento
  realoadJSON();
}, false);

const json = 'https://raw.githubusercontent.com/Laboratoria/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json';

window.realoadJSON = () => {
  fetch(json)
    .then(response => response.json())
    .then((res) => {
      const infoStudent = computeStudentsStats(res);
      const infoGeneration = computeGenerationsStats(res);
      // filterStudents(infoStudent);
      studentDraw(infoStudent);
      generationDraw(infoGeneration);
      return infoStudent;
    })
    .then((infoS) => {
      // console.log(infoS);
      const resultOrder = sortStudents(infoS, 'name', 'ASC');
      filterDraw(infoS);
    })
    .catch(error => {
      console.log(error)
    });
};

// pintar tabla de estudiantes
let listaEstudiantes = document.getElementById('tablaEstudiantes');

// Variable que pintara la lista de estudiantes.
let listaResult = document.getElementById('lista_estudiantes');
let containerG = document.getElementById('contenido_general');
let carrusel = document.getElementById('carrusel');
let searchLabel = document.getElementById('search-label');


// llamados id de links
let clickEstudiantesTodos = document.getElementById('estudiantes');
let clickSedes = document.getElementById('sedes');
let modalSerchResult = document.getElementById('modal-search');
let clickbtnSearch = document.getElementById('clickbtn-search')



window.studentDraw = (infoStudent) => {
  let number = 1;
  for (let i = 0; i < infoStudent.length; i++) {
    listaResult.innerHTML += `
            <tr><th scope="col"> ${number + i}</th>
                <th scope="col"> ${infoStudent[i].name}</th>
                <th scope="col"> ${infoStudent[i].mail}</th>
                <th scope="col"> ${infoStudent[i].campus}</th>
                <th scope="col"> ${infoStudent[i].turnoStudent}</th>
                <th scope="col"> ${infoStudent[i].stats.completedPercentage}</th>
                <th scope="col"> ${infoStudent[i].stats.status}</th>
            </tr>
            `;
  }
};

window.filterDraw = (infoS) => {
  const resultSearch = filterStudents(infoS, 'Sherrie Jeana');
  // console.log(resultSearch);
  if (resultSearch) {
    modalSerchResult.innerHTML =
    `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${resultSearch[0].name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Sede: ${resultSearch[0].campus}</p>
            <p>Generación: ${resultSearch[0].generation}</p>
            <p>E-mail: ${resultSearch[0].mail}</p>
            <p>% de Completitud: ${resultSearch[0].stats.completedPercentage}</p>
            <p>La estudiante: ${resultSearch[0].stats.status}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    alert('No existe registro');
  }
};

window.generationDraw = (infoGeneration) => {
  for (let i = 0; i < infoGeneration.length; i++) {
    containerG.innerHTML += `
        <div id="cardColor" class="card col-11 col-lg-4 offset-lg-1">
            <div class="info">
                <p>Sede: ${infoGeneration[i].campus}</p>
                <p>Generación: ${infoGeneration[i].generation}</p>
                <p>% LMS: ${infoGeneration[i].average}</p>
                <p># de Estudiantes: ${infoGeneration[i].count}</p>
            </div>
        </div> `;
  }
};


// evento para jalar lista de estudiantes
clickEstudiantesTodos.addEventListener('click', (e) => {
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block';
});

clickSedes.addEventListener('click', (e) => {
  carrusel.style.display = 'none';
  listaEstudiantes.style.display = 'none';
  containerG.style.display = 'block';
});

clickbtnSearch.addEventListener('click', (e) => {
  // console.log(searchLabel.value);
  console.log('seguimos trabajando');
})
