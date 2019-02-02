document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded es un evento
  realoadData();
}, false);


const json = 'https://raw.githubusercontent.com/Laboratoria/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json';

window.realoadData = () => {
  fetch(json)
    .then(response => response.json())
    .then((res) => {
      const infoStudent = computeStudentsStats(res);
      const infoGeneration = computeGenerationsStats(res);
      return {infoStudent, infoGeneration};
    })
    .then((infoData) => {
      const dataStorage = localStorage.setItem('data', JSON.stringify(infoData));
      return dataStorage
    })
    .catch(error => {
      console.log(error)
    });
};

// elementos del DOM
const campusDom = document.getElementById('campus-dom');

const studentsDom = document.getElementById('students-dom');
const eMex = document.getElementById('e-mex');
const eStg = document.getElementById('e-stg');
const eLim = document.getElementById('e-lim');

const searchLabel = document.getElementById('search-label');
const clickbtnSearch = document.getElementById('clickbtn-search');

const carrusel = document.getElementById('carrusel');
const listaEstudiantes = document.getElementById('tablaEstudiantes');
const listaResult = document.getElementById('lista_estudiantes');
const containerG = document.getElementById('contenido_general');

const orderName = document.getElementById('order_name');
const orderPercentage = document.getElementById('order_percentage');
let countSort = 0;

window.drawTable = (data) => {
  let number = 1;
  for (let i = 0; i < data.length; i++) {
    listaResult.innerHTML += `
            <tr>
              <th scope="col"> ${number + i}</th>
              <th scope="col"> ${data[i].name}</th>
              <th scope="col"> ${data[i].campus}</th>
              <th scope="col"> ${data[i].turnoStudent}</th>
              <th scope="col">
                <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#modal1000${i}">
                    Info
                </button>
              </th>
            </tr>
            <!--modal-->
            <div class="modal fade" id="modal1000${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${data[i].name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Sede: ${data[i].campus}</p>
                  <p>Generación: ${data[i].generation}</p>
                  <p>E-mail: ${data[i].mail}</p>
                  <p>% de Completitud: ${data[i].stats.completedPercentage}</p>
                  <p>La estudiante: ${data[i].stats.status}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>`;
  }
}



window.studentfilter = (infoStudent, pais) => {
  listaResult.innerHTML= '';
  if (pais !== 'todos') {
    let infoStudentRes = infoStudent.filter((obj) => {
      if ('campus' in obj && (obj.campus) === pais) {
        return true;
      } else {
        return false;
      }
    })
    console.log(infoStudentRes);
    drawTable(infoStudentRes);
  } else {
    drawTable(infoStudent);
  }
};


window.filterDraw = (infoS) => {
  const nameStudent = searchLabel.value;
  if (nameStudent === '') {
    alert('no has escrito ningun nombre');
  } else {
    const resultSearch = filterStudents(infoS, nameStudent);
    console.log(resultSearch);
    if (resultSearch.length>0) {
      listaResult.innerHTML='';
      drawTable(resultSearch);
    } else {
      alert('No existe registro');
    };
  };
};

window.sorterDraw = (infoS, orderBy) => {
  console.log(infoS);
  if (countSort === 0) {
    const resultSearch = sortStudents(infoS, orderBy, 'ASC');
    countSort++;
    listaResult.innerHTML='';
    drawTable(resultSearch);
  } else {
    const resultSearch = sortStudents(infoS, orderBy, 'DESC');
    countSort--;
    listaResult.innerHTML='';
    drawTable(resultSearch);
  };
};

window.generationDraw = (infoGeneration) => {
  containerG.innerHTML='';
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


// window.eventTable = (pais) => {
//   const dataLStorage = JSON.parse(localStorage.getItem('data'));
//   const dataGralStudent = dataLStorage.infoStudent;
//   studentfilter(dataGralStudent, pais);
//   carrusel.style.display = 'none';
//   containerG.style.display = 'none';
//   listaEstudiantes.style.display = 'block';
// }


// eventos

studentsDom.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  studentfilter(dataGralStudent, 'todos');
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block';
});

eMex.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  studentfilter(dataGralStudent, 'mexico');
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block';
});

eStg.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  studentfilter(dataGralStudent, 'santiago');
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block';
});

eLim.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  studentfilter(dataGralStudent, 'lima');
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block';
});

campusDom.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralCamp = dataLStorage.infoGeneration
  generationDraw(dataGralCamp);
  carrusel.style.display = 'none';
  listaEstudiantes.style.display = 'none';
  containerG.style.display = 'block';
});

clickbtnSearch.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  filterDraw(dataGralStudent);
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block'
});

orderName.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  sorterDraw(dataGralStudent, 'name');
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block'
});

orderPercentage.addEventListener('click', (e) => {
  const dataLStorage = JSON.parse(localStorage.getItem('data'));
  const dataGralStudent = dataLStorage.infoStudent;
  sorterDraw(dataGralStudent, 'completedPercentage');
  carrusel.style.display = 'none';
  containerG.style.display = 'none';
  listaEstudiantes.style.display = 'block'
});