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
      const infoData = {infoStudent, infoGeneration};
      return infoData;
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
const mex = document.getElementById('mex');
const stg = document.getElementById('stg');
const lim = document.getElementById('lim');

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

const modalSerchResult = document.getElementById('modal-search');


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
    let number = 1;
    for (let i = 0; i < infoStudentRes.length; i++) {
      // console.log(infoStudentRes[i].campus);
      listaResult.innerHTML += `
              <tr><th scope="col"> ${number + i}</th>
                  <th scope="col"> <a href="">${infoStudentRes[i].name}</a></th>
                  <th scope="col"> ${infoStudentRes[i].campus}</th>
                  <th scope="col"> ${infoStudentRes[i].turnoStudent}</th>
              </tr>
              `;
    }
  } else {
    let number = 1;
    for (let i = 0; i < infoStudent.length; i++) {
      listaResult.innerHTML += `
                <tr><th scope="col"> ${number + i}</th>
                    <th scope="col"> <a href="">${infoStudent[i].name}</a></th>
                    <th scope="col"> ${infoStudent[i].campus}</th>
                    <th scope="col"> ${infoStudent[i].turnoStudent}</th>
                </tr>
                `;
    }
  }
};


window.filterDraw = (infoS) => {
  // console.log(infoS);
  const nameStudent = searchLabel.value;
  if (nameStudent === '') {
    alert('no has escrito ningun nombre');
  } else {

    const resultSearch = filterStudents(infoS, nameStudent);
    console.log(resultSearch);
    if (resultSearch.length>0) {
      listaResult.innerHTML='';
      let number = 1;
      for (let i = 0; i < resultSearch.length; i++) {
        listaResult.innerHTML += `
                  <tr><th scope="col"> ${number + i}</th>
                      <th scope="col"> <a href="">${resultSearch[i].name}</a></th>
                      <th scope="col"> ${resultSearch[i].campus}</th>
                      <th scope="col"> ${resultSearch[i].turnoStudent}</th>
                  </tr>
                  `;
      }
    } else {
      alert('No existe registro');
    }
    // if (resultSearch.length > 0) {
    //   modalSerchResult.innerHTML =
    //     `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div class="modal-dialog" role="document">
    //       <div class="modal-content">
    //         <div class="modal-header">
    //           <h5 class="modal-title" id="exampleModalLabel">${resultSearch[0].name}</h5>
    //           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>
    //         <div class="modal-body">
    //           <p>Sede: ${resultSearch[0].campus}</p>
    //           <p>Generación: ${resultSearch[0].generation}</p>
    //           <p>E-mail: ${resultSearch[0].mail}</p>
    //           <p>% de Completitud: ${resultSearch[0].stats.completedPercentage}</p>
    //           <p>La estudiante: ${resultSearch[0].stats.status}</p>
    //         </div>
    //         <div class="modal-footer">
    //           <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
    // } else {
    //   alert('No existe registro');
    // }
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
  // console.log(searchLabel.value);
  // const dataLStorage = JSON.parse(localStorage.getItem('data'));
  // console.log(dataLStorage);
})
