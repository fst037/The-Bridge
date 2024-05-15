function leerDatosAcademicos(){
  let carrera = document.querySelector("#ctl00_ContentPlaceHolderMain_LblCarrera").textContent.split("-")[0].trim();
  let plan = document.querySelector("#ctl00_ContentPlaceHolderMain_LblCarrera").textContent.split("-")[1].trim();

  let tablaMaterias = document.querySelector("#ctl00_ContentPlaceHolderMain_Table1");
  let filas = tablaMaterias.querySelectorAll("tr[class^='nota_'], tr.tr_grilla");

  let materiasAprobadas = [];
  let materiasNoAprobadas = [];

  for (let fila of filas) {
    let materia = fila.children[0].textContent.trim();
    let estado = fila.children[2].textContent.trim();
    let nota = fila.children[3].textContent.trim();

    if (estado === "APROBADO" || estado === "PROMOCIONA") {
      materiasAprobadas.push([materia, nota]);
    } else {
      materiasNoAprobadas.push([materia, nota]);
    }
  }

  let promedio = document.querySelector("#ctl00_ContentPlaceHolderMain_lblPromValor").textContent.trim();

  console.log(carrera);
  console.log(plan);
  console.log("Promedio: " + promedio);

  console.log("Materias aprobadas: ");
  console.log(materiasAprobadas);
  console.log("Materias no aprobadas: ");
  console.log(materiasNoAprobadas);
}

leerDatosAcademicos();