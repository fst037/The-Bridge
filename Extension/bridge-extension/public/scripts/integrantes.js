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
          <td colspan="6">
            <table style="width: 100%">
              <thead>
                <tr>
                  <td colspan="6">Presentacion</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="presentacion-${email}" colspan="6">
                    Cargando Presentacion...
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="width: 100%">
              <thead>
                <tr>
                  <td colspan="6">Comentarios</td>
                </tr>
              </thead>
              <tbody id="comentariosContainer-${email}">
                <tr>
                  <td>Cargando Comentarios...</td>
                </tr>
              </tbody>
            </table>

            <table style="width: 100%">
              <thead>
                <tr>
                  <td colspan="6">Portfolio</td>
                </tr>
              </thead>
              <tbody id="proyectosContainer-${email}">
                <tr>
                  <td>Cargando Proyectos...</td>
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
  document.getElementById("presentacion-"+email).textContent = data.introduction;
        let comentarios = data.comments
          .map((comment) => {
            return `<li>
            <div>
              <div style="display: flex; justify-content: space-between;">
                <p>De: ${comment.remitente}</p>
                <p>${comment.timestamp}</p>
              </div>
              <p>${comment.mensaje}</p>
              
            </div>    
            
          </li>`;
          })
          .join("");

        document.getElementById("comentariosContainer-"+email).innerHTML =
          `
        <tr>
                  <td>
                    <ul style="margin: 0; padding: 0; list-style-type: none; display:flex; flex-direction:column; justify-content:space-between; height:100%; width: 100%">
                      <li style="flex-grow:1">
                        <button style="width:100%; margin:0; padding:0" id="btnPrevComentario-${email}">Prev</button>
                      </li>
                      <li style="flex-grow:1">
                        <button style="width:100%; margin:0; padding:0" id="btnNextComentario-${email}">Next</button>
                      </li>
                    </ul>
                  </td>
                  <td colspan="5">
                    <div
                      id="comentariosContainer"
                      style="position: relative; overflow: hidden"
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

        let proyectos = data.projects
          .map((project) => {
            return `<li>
              <div style="display: flex; justify-content: space-between">
              <h3>${project.titulo}</h3>
              <p>Curso: ${project.curso.name}</p>
              </div>
            <div style="display: flex">
            <img
              style="max-width: 200px; max-height: 100px"
              src="${project.portadaLink}"
              alt="ImagenProyecto"
            />
            <p>
              ${project.descripcion}
            </p>
            </div>
            <div>
              <h4>Links</h4>
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
              <h4>Equipo: ${project.equipo.nombre}</h4>
              <ul style="list-style-type: none;">
                ` +
              project.members
                .map((member) => {
                  return `<li style="display:flex; justify-content: space-between">
                      <a href="localhost:5173/profile/${member.username}" target="blank">${member.name}</a>
                      <div>${member.username}</div>
                      <div>${member.legajo}</div>
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
                  <td colspan="6">                    
                    <ul
                      id="portfolio-${email}"
                      style="margin: 0; padding: 0; list-style-type: none;"
                    >
                      `+ proyectos +`
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <button id="btnPrevProyecto-${email}" style="width: 100%">
                      Prev
                    </button>
                  </td>
                  <td colspan="3">
                    <button id="btnNextProyecto-${email}" style="width: 100%">
                      Next
                    </button>
                  </td>
                </tr>
        `;

        setAnimacionesCarrousel(email);
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

function setAnimacionesCarrousel(email){
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
setAnimacionesCarrousel()