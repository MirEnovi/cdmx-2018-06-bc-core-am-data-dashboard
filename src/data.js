document.addEventListener('DOMContentLoaded', ()=>{//DOMContentLoaded es un evento
    realoadJSON();
    },false)

const json = "https://raw.githubusercontent.com/Laboratoria/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json";

window.realoadJSON = () => {

    fetch(json)
    .then(response => response.json())
    .then((res) => {
        computeStudentsStats(res);
        computeGenerationsStats(res)
    })
    // .catch((error) => {
    //     console.log(error)
    // });
}
// realoadJSON();


window.computeStudentsStats = (laboratoria) => {
    const arrayResult = [];
    const objEstudiantes = {

        campus: "",
        generation: "",
        numStudent: 0,
        name: "",
        mail: "",
        turnoStudent: "",
        stats:{ //Un objeto con las siguientes propiedades
            status: "",//debajo del 60, en 90 o superándolo
            completedPercentage: 0,//porcentaje de completitud general
            topics:{ //hay que genrara un objeto de cada tema
                //completedPercentage:
                //percentageDuration:
                // subtopics:{
                    // ompletedPercentage:
                    // type:
                    // duration:
                // }

            },
        },
        average: 0,
    }
    for (key in laboratoria){
        objEstudiantes.campus = key;
        const generations = Object.keys(laboratoria[key].generacion);
        let n = 1;
        generations.forEach((generation) => {
            generation = generation;
            students = laboratoria[key].generacion[generation].estudiantes;
            for (let i = 0; i < students.length; i++) {
                objEstudiantes.average = students[i].progreso.porcentajeCompletado;
                objEstudiantes.numStudent = i;
                objEstudiantes.nameStudent = students[i].nombre;
                objEstudiantes.mailStudent = students[i].correo;
                objEstudiantes.turnoStudent = students[i].turno;

                arrayResult.push(objEstudiantes);

                // objEstudiantes.generation =
                console.log(arrayResult);

                listaResult.innerHTML += `
                <tr><th scope="col"> ${n+i}</th>
                    <th scope="col"> ${objEstudiantes.nameStudent}</th>
                    <th scope="col"> ${objEstudiantes.mailStudent}</th>
                    <th scope="col"> ${objEstudiantes.turnoStudent}</th>
                    <th scope="col"> ${objEstudiantes.average}</th>
                    <th scope="col"> ${objEstudiantes.campus}</th>
                </tr>
                ` ;
            }
            listaResult.innerHTML += `<br>`;
        })
    }
    // console.log(arrayResult);
    return  //arrayResult; //objEstudiantes;
}



window.computeGenerationsStats = (laboratoria) => {
    const arrayResult = [];

    const obj = {
        campus: '',
        generation: '',
        average: 0,
        count: 0,
    }

    for (key in laboratoria){
        //rellenando propiedad 'campus' con la key de Laboratoria
        obj.campus = key;
        //devolviendo un array del objeto de generaciones
        const generaciones = Object.keys(laboratoria[key].generacion);
        // console.log(generaciones);
        generaciones.forEach((generation) => {
            obj.generation = generation;
            const students = laboratoria[key].generacion[generation].estudiantes;
            let result="";
            for(student in students){
                average = 0;
                average += students[student].progreso.porcentajeCompletado;
                // console.log(students.length);
                average /= students.length;
                obj.average = Math.round(average);
                obj.count = students.length;
            }
            // console.log(obj.campus);
            containerG.innerHTML += `
            <div id="cardColor" class="card">
                <div class="info">
                    <p>Sede: ${obj.campus}</p>
                    <p>Generación: ${obj.generation}</p>
                    <p>% LMS: ${obj.average}</p>
                    <p># de Estudiantes: ${obj.count}</p>
                </div>
            </div> `
        })
    }
    return obj;
}


    window.sortStudents = () => {return},
    window.filterStudents = () => {return}
