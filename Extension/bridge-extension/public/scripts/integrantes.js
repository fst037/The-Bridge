function crearEncabezado() {  
  let th = document.createElement("th");
  th.style.textAlign = "center";
  th.setAttribute("data-field", "2");
  let div1 = document.createElement("div");
  div1.className = "th-inner";
  div1.textContent = "Bridge";
  let div2 = document.createElement("div");
  div2.className = "fht-cell";
  th.appendChild(div1);
  th.appendChild(div2);
  let tr = document.querySelector("#tableintegrantes > thead > tr");
  tr.insertBefore(th, tr.children[2]);
}

function cargarIntegrantesNeo4j() {
  console.log("Leyendo integrantes...");
  let filas = document.querySelectorAll("#tableintegrantes > tbody > tr");
  let integrantes = [];
  for (let fila of filas) {

    let name = fila.children[1].textContent.trim();
    let username = fila.children[2].textContent.trim().toLowerCase();
    let legajo = fila.children[3].textContent.trim();

    let integrante = {
      name: name,
      username: username,
      legajo: legajo
    };
    if (fila.children[4].textContent.trim() == "Alumno")
    integrantes.push(integrante);
  }
  console.log(integrantes);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //TODO usar credenciales de la extensión

  let username = "sacarle@uade.edu.ar";
  let password = "password";
  let encodedCredentials = btoa(username + ":" + password);
  let authHeader = "Basic " + encodedCredentials;

  myHeaders.append("Authorization", authHeader);

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  let url = window.location.href;
  let parts = url.split("=");
  let courseCode = parts[parts.length - 1];

  let integrantesYaPresentes = [];
  
  fetch("http://localhost:8080/api/v1/cursos/usuariosDeCurso?courseCode=" + courseCode, requestOptions)
    .then((response) => response.text())
    .then((result) => integrantesYaPresentes = JSON.parse(result))
    .then(() => {

      let nombresYaPresentes = integrantesYaPresentes.users.map(integrante => integrante.username);

      console.log(nombresYaPresentes);

      let integrantesFiltrados = integrantes.filter(integrante => !nombresYaPresentes.includes(integrante.username));

      fetch('http://localhost:8080/api/v1/auth/preRegisterUsers', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(integrantesFiltrados)
      })

      .then(data => console.log(data))
      .then(() => {


        let courseData = {
          courseCode: courseCode,
          usernames: integrantes.map(integrante => integrante.username)
        };
      
        console.log(courseData);
      
        fetch('http://localhost:8080/api/v1/cursos/agregarVariosUsuariosACurso', {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(courseData)
        })
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
    .catch((error) => console.error(error));

}

function agregarBotonACadaFila() {
  let filas = document.querySelectorAll("#tableintegrantes > tbody > tr");
  for (let fila of filas) {    
    let td = document.createElement("td");
    td.style.textAlign = "center";

    let boton = document.createElement("a");
    let img = document.createElement("img");
    img.src = "https://i.imgur.com/7sYdczi.png";
    img.style.width = "50px";
    let email = fila.children[2].textContent.trim();

    let tempContent = fila.children[1].innerHTML;

    fila.children[1].innerHTML = `<a href="localhost:5173/perfil/${email}" target="blank">${tempContent}</a>`;

    boton.id = "botonPerfil-"+email;
    
    boton.appendChild(img);
    
    boton.addEventListener("click", function(event) {
      // Prevenir la acción predeterminada del enlace
      event.preventDefault();

      // Cargar el perfil del integrante
      cargarPerfil(email);

      // Obtener la siguiente fila
      let siguienteFila = fila.nextElementSibling;

      // Alternar la visibilidad de la siguiente fila
      if (siguienteFila) {
        siguienteFila.classList.toggle("d-none");
      }
    });
    td.appendChild(boton);
    fila.insertBefore(td, fila.children[2]);
    let sigFilaHTML = `<tr class="d-none">
          <td style="background: #F0E9FF;border-radius: 10px;" colspan="6">
            <table style="width: 100%">
              <thead>
                <tr>
                  <td style="border-radius: 10px;" colspan="5"><h5 style="margin:5px">Presentación</h5></td>
                  <td style="border-radius: 10px;" colspan="1"><h5 style="margin:5px">Habilidades</h5></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border-radius: 10px;vertical-align:top" id="presentacion-${email}" colspan="5">
                    Cargando Presentacion...
                  </td>
                  <td id="skills-${email}" colspan="1" style="box-sizing: border-box;width: 200px;border-radius: 10px;">
                    Cargando Skills...
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="width: 100%">
              <thead>
                <tr>
                  <td style="border-radius: 10px;" colspan="6"><h5 style="margin:5px">Comentarios</h5></td>
                </tr>
              </thead>
              <tbody id="comentariosContainer-${email}">
                <tr>
                  <td style="border-radius: 10px;">Cargando Comentarios...</td>
                </tr>
              </tbody>
            </table>

            <table style="width: 100%">
              <thead>
                <tr>
                  <td style="border-radius: 10px;" colspan="6"><h5 style="margin:5px">Portfolio</h5></td>
                </tr>
              </thead>
              <tbody id="proyectosContainer-${email}">
                <tr>
                  <td style="border-radius: 10px;">Cargando Proyectos...</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="d-none"></tr>`;
    fila.insertAdjacentHTML("afterend", sigFilaHTML);
  }
}

function completarPerfil(email, data) {
  
  if (data.introduction == null) {
    document.getElementById("presentacion-"+email).textContent = "No hay información.";
  } else {
    document.getElementById("presentacion-"+email).textContent = data.introduction;
    document.getElementById("presentacion-"+email).style.padding = "10px";
  }

  data.skills = {
    "Comunicación": parseFloat(data.skills.Comunicación).toFixed(5),
    "Desarrollo": parseFloat(data.skills.Desarrollo).toFixed(5),
    "Organización": parseFloat(data.skills.Organización).toFixed(5),
    "Ideación": parseFloat(data.skills.Ideación).toFixed(5),
    "Liderazgo": parseFloat(data.skills.Liderazgo).toFixed(5)
  };

  const defaultSkills = {
    "Comunicación": "0.12000",
    "Desarrollo": "0.12000",
    "Organización": "0.12000",
    "Ideación": "0.12000",
    "Liderazgo": "0.12000"
  };

  let hasSkills = false;

  for (const key in defaultSkills) {
    console.log(data.skills[key]);
    console.log(defaultSkills[key]);
    if (data.skills[key] !== defaultSkills[key]) {
      hasSkills = true;
      break;
    }
  }

  if (!hasSkills) {
    document.getElementById("skills-"+email).textContent = "No hay información.";
  } else {
    document.getElementById("skills-"+email).innerHTML = `
          <canvas id="skillsChart-${email}" height="200" width="400"></canvas>
        `;

        var ctx = document.getElementById(`skillsChart-${email}`).getContext('2d');

        var skillNames = Object.keys(data.skills);
        var skillValues = Object.values(data.skills);

        var myChart = new Chart(ctx, {
            type: 'radar', // Specify the chart type here
            data: {
                labels: skillNames, // X-axis labels
                datasets: [{
                    data: skillValues, // Data points for the chart
                    fill: true,
                    backgroundColor: 'rgb(255, 128, 110, 0.3)',
                    borderColor: '#00BCC6',
                    pointBackgroundColor: '#00BCC6',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00BCC6',
                    borderWidth: 1
                }]
            },
            options: {
              responsive: false, // Disable responsive behavior
              maintainAspectRatio: false,
              scales: {
                      r: {
                        ticks: {
                          beginAtZero: true,
                          fontSize: 4,
                          backdropColor: 'transparent', // Set the ticks background to transparent
                          fontColor: 'black',
                        },
                        pointLabels: {
                            fontSize: 16 // Adjust the font size for labels on the points
                        }
                    }
                },
              plugins: {
                    legend: {
                        display: false // Disable legend
                    }
                }
            },
        });
  }
  

  if (data.comments.length == 0) {
    document.getElementById("comentariosContainer-"+email).innerHTML = `<tr>
                  <td style="border-radius: 10px;">No hay comentarios.</td>
                </tr>`;
  } else {
    const dateOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric'// Show milliseconds
    };

    let comentarios = data.comments
      .map((comment) => {
        return `<li>
        <div>
          <div style="display: flex; justify-content: space-between; border-bottom: 2px solid black;padding: 5px;margin-bottom: 5px;">
            <p style="margin:0px" >De: ${comment.remitente}</p>
            <p style="margin:0px">${new Intl.DateTimeFormat('es-ES', dateOptions).format(new Date(comment.timestamp))}</p>
          </div>
          <p style="margin: 5px">${comment.mensaje}</p>
          
        </div>    
        
      </li>`;
      })
      .join("");  

    document.getElementById("comentariosContainer-"+email).innerHTML =
      `
    <tr>
              <td style="height:100%;width: 150px; border-radius: 10px;">
                <ul style="margin: 0; padding: 0; list-style-type: none; display:flex; flex-direction:column; justify-content:space-between; height:100px; width: 100%">
                  <li style="flex-grow:1; margin: 5px">
                    <button style="cursor: pointer;width:100%; height:100%; margin:0; padding:0; border-radius: 10px; background: #FF806E" id="btnPrevComentario-${email}">Anterior</button>
                  </li>
                  <li style="flex-grow:1; margin: 5px">
                    <button style="cursor: pointer;width:100%; height:100%; margin:0; padding:0; border-radius: 10px; background: #00BCC6" id="btnNextComentario-${email}">Siguiente</button>
                  </li>
                </ul>
              </td>
              <td colspan="5" style="vertical-align:top; border-radius: 10px;">
                <div
                  id="comentariosContainer"
                  style="position: relative; overflow: hidden; height:fit-content"
                >
                  <ul
                    id="comentarios-${email}"
                    style="margin: 0; padding: 0; list-style-type: none"
                  >
                    ` +
      comentarios +
      `
                  </ul>
                </div>
              </td>
            </tr>`;
    setAnimacionesCarrouselComentarios(email);
  }

  if (data.projects.length == 0) {
    document.getElementById("proyectosContainer-"+email).innerHTML = `<tr>
                  <td style="border-radius: 10px;">No hay proyectos.</td>
                </tr>`;
  } else {
    let proyectos = data.projects
      .map((project) => {
        return `<li>
          <div style="display: flex;justify-content: space-between;margin-bottom: 5px;padding: 5px;border-bottom: 2px solid black;align-items: end;">
          <h3 style="margin:0px">${project.titulo}</h3>
          <p style="margin:0px">Curso: ${project.curso.name}</p>
          </div>
        <div style="display: flex; margin:10px">
        <img
          style="max-width: 200px; max-height: 100px;"
          src="${project.portadaLink}"
          alt="ImagenProyecto"
        />
        <div style="margin-left: 10px;width: 100%;border: 1px solid grey; border-radius: 10px">
          <p style="width: 100%;height: fit-content; margin:5px">
            ${project.descripcion}
          </p>
        </div>
        </div>
        <div>
          <h5 style="margin: 5px;border-bottom: 2px solid grey">Links</h4>
          <ul style="list-style-type: none;">
            ` +
          project.links
            .map((link) => {
              return `<li><a href="${link}" target="blank">${link}</a></li>`;
            })
            .join("") +
          `
          </ul>
        </div>
        <div>
          <h5 style="margin: 5px;border-bottom: 2px solid grey">Equipo: ${project.equipo.nombre}</h4>
          <ul style="list-style-type: none;">
            ` +
          project.members
            .map((member) => {
              return `<li style="display:flex; justify-content: space-between">
                  <a style="width: 35%" href="localhost:5173/perfil/${member.username}" target="blank">${member.name}</a>
                  <div style="width: 35%">${member.username}</div>
                  <div style="width: 30%">${member.legajo}</div>
                </li>`;
            })
            .join("") +
          `
          </ul>
        </div>
      </li>`;
      })
      .join("");
    
    document.getElementById("proyectosContainer-"+email).innerHTML = `
      <tr>
              <td style="border-radius: 10px;" colspan="6">                    
                <ul
                  id="portfolio-${email}"
                  style="margin: 0; padding: 0; list-style-type: none;"
                >
                  `+ proyectos +`
                </ul>
              </td>
            </tr>
            <tr>
              <td style="border-radius: 10px; padding:5px" colspan="3">
                <button id="btnPrevProyecto-${email}" style="cursor: pointer;width: 100%; border-radius: 10px; background: #FF806E">
                  Anterior
                </button>
              </td>
              <td style="border-radius: 10px; padding:5px" colspan="3">
                <button id="btnNextProyecto-${email}" style="cursor: pointer;width: 100%;border-radius: 10px; background: #00BCC6">
                  Siguiente
                </button>
              </td>
            </tr>
    `;
    setAnimacionesCarrouselProyectos(email);
  }  
}

function cargarPerfil(email) {
  if (perfilesCargados.includes(email)) {
    return;
  }

  console.log("Cargando perfil de " + email);
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  let data = {};

  fetch("http://localhost:8080/api/v1/profile/?username="+email, requestOptions)
    .then((response) => response.text())
    .then((result) => data = JSON.parse(result))
    .then(() => completarPerfil(email, data))
    .catch((error) => console.error(error));

  perfilesCargados.push(email);  
}

function agregarEstilos() {
  let style = document.createElement("style");
  style.textContent = `.slide-in {
    animation: slide-in 0.5s forwards;
    z-index: -1;
  }

  .slide-out {
    animation: slide-out 0.5s forwards;
    z-index: -1;
  }

  @keyframes slide-in {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0); }
  }

  @keyframes slide-out {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }

  .slide-in-reverse {
    animation: slide-in-reverse 0.5s forwards;
  }
  
  .slide-out-reverse {
    animation: slide-out-reverse 0.5s forwards;
  }
  
  @keyframes slide-in-reverse {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(0); }
  }
  
  @keyframes slide-out-reverse {
    0% { transform: translateY(0); }
    100% { transform: translateY(100%); }
  }

  .slide-in-left {
    animation: slide-in-left 0.5s forwards;
  }

  .slide-out-left {
    animation: slide-out-left 0.5s forwards;
  }

  @keyframes slide-in-left {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
  }

  @keyframes slide-out-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  .slide-in-left {
    animation: slide-in-left 0.5s forwards;
  }

  .slide-out-left {
    animation: slide-out-left 0.5s forwards;
  }

  @keyframes slide-in-left {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
  }

  @keyframes slide-out-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  .slide-in-right {
    animation: slide-in-right 0.5s forwards;
  }

  .slide-out-right {
    animation: slide-out-right 0.5s forwards;
  }

  @keyframes slide-in-right {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }

  @keyframes slide-out-right {
    0% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }`;
  document.head.appendChild(style);
}

function setAnimacionesCarrouselComentarios(email){
  let comentarios = document.getElementById("comentarios-"+email).children;
  let btnNext = document.getElementById("btnNextComentario-"+email);
  let btnPrev = document.getElementById("btnPrevComentario-"+email);
  let index = 0;

  // Ocultar todos los comentarios al principio
  for (let i = 0; i < comentarios.length; i++) {
    comentarios[i].style.display = "none";
  }

  // Mostrar el primer comentario
  if (comentarios.length > 0) {
    comentarios[0].style.display = "block";
  }

  btnNext.addEventListener("click", function(event) {
    event.preventDefault();
    // Ocultar el comentario actual
    comentarios[index].classList.add("slide-out");

    setTimeout(function() {
      comentarios[index].style.display = "none";
      comentarios[index].classList.remove("slide-out");

      // Incrementar el índice
      index = (index + 1) % comentarios.length;

      // Mostrar el siguiente comentario
      comentarios[index].style.display = "block";
      comentarios[index].classList.add("slide-in");

      setTimeout(function() {
        comentarios[index].classList.remove("slide-in");
      }, 500);
    }, 500);
  });

  btnPrev.addEventListener("click", function(event) {
    event.preventDefault();
  // Ocultar el comentario actual
    comentarios[index].classList.add("slide-out-reverse");

    setTimeout(function() {
      comentarios[index].style.display = "none";
      comentarios[index].classList.remove("slide-out-reverse");

      // Decrementar el índice
      index = (index - 1 + comentarios.length) % comentarios.length;

      // Mostrar el comentario anterior
      comentarios[index].style.display = "block";
      comentarios[index].classList.add("slide-in-reverse");

      setTimeout(function() {
        comentarios[index].classList.remove("slide-in-reverse");
      }, 500);
    }, 500);
  });
}

function setAnimacionesCarrouselProyectos(email){
  
  var portfolioItems = document.getElementById(`portfolio-${email}`).children;
  var btnNextPortfolio = document.getElementById("btnNextProyecto-"+email);
  var btnPrevPortfolio = document.getElementById("btnPrevProyecto-"+email);
  var indexPortfolio = 0;

  // Ocultar todos los elementos del portfolio excepto el primero
  for (var i = 1; i < portfolioItems.length; i++) {
    portfolioItems[i].style.display = 'none';
  }

  btnNextPortfolio.addEventListener("click", function(event) {
    event.preventDefault();
    // Ocultar el comentario actual
    portfolioItems[indexPortfolio].classList.add("slide-out-left");

    setTimeout(function() {
      portfolioItems[indexPortfolio].style.display = "none";
      portfolioItems[indexPortfolio].classList.remove("slide-out-left");

      // Incrementar el índice
      indexPortfolio = (indexPortfolio + 1) % portfolioItems.length;
      console.log(indexPortfolio);
      // Comprobar si el índice es válido

      if (indexPortfolio < portfolioItems.length) {
        // Mostrar el siguiente elemento del portfolio
        portfolioItems[indexPortfolio].style.display = "block";
        portfolioItems[indexPortfolio].classList.add("slide-in-left");
      } else {
        // Si el índice no es válido, mostrar el primer elemento
        portfolioItems[0].style.display = "block";
        indexPortfolio = 0;
        portfolioItems[indexPortfolio].classList.add("slide-in-left");
      }
      console.log(portfolioItems.length);
      console.log(indexPortfolio);
      setTimeout(function() {
        portfolioItems[indexPortfolio].classList.remove("slide-in-left");
      }, 500);
    }, 500);
  });

  btnPrevPortfolio.addEventListener("click", function(event) {
    event.preventDefault();
    // Ocultar el elemento del portfolio actual
    portfolioItems[indexPortfolio].classList.add("slide-out-right");

    setTimeout(function() {
      portfolioItems[indexPortfolio].style.display = "none";
      portfolioItems[indexPortfolio].classList.remove("slide-out-right");

      // Decrementar el índice
      indexPortfolio = (indexPortfolio - 1 + portfolioItems.length) % portfolioItems.length;

      // Comprobar si el índice es válido
      if (indexPortfolio >= 0) {
        // Mostrar el elemento del portfolio anterior
        portfolioItems[indexPortfolio].style.display = "block";
        portfolioItems[indexPortfolio].classList.add("slide-in-right");
      } else {
        // Si el índice no es válido, mostrar el último elemento
        portfolioItems[portfolioItems.length - 1].style.display = "block";
        indexPortfolio = portfolioItems.length - 1;
        portfolioItems[indexPortfolio].classList.add("slide-in-right");
      }
      console.log(portfolioItems.length);
      console.log(indexPortfolio);
      setTimeout(function() {
        portfolioItems[indexPortfolio].classList.remove("slide-in-right");
      }, 500);
    }, 500);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request)
  if (request.nombre !== undefined && request.encendido !== undefined) {
    // An Interruptor was toggled in the extension
    console.log(request.nombre + ' was toggled. New state: ' + request.encendido);
  }
});

let perfilesCargados = [];

cargarIntegrantesNeo4j();
crearEncabezado();
agregarBotonACadaFila();
agregarEstilos();