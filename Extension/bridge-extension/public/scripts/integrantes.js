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
    img.src = "https://lh3.googleusercontent.com/ogw/AF2bZyg6xCr_vEM6tw2LISVEWXQb6ygRrE9Al-95Mhr3oA=s32-c-mo";
    let email = fila.children[2].textContent.trim();

    boton.href = "mailto:" + email;
    boton.target = "_blank";
    
    boton.appendChild(img);
    
    boton.addEventListener("click", function(event) {
      // Prevenir la acción predeterminada del enlace
      event.preventDefault();

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

                        <table style="width:100%;">
              <thead>
                <tr>
                  <td colspan="6">Presentacion</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="6"> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel risus eget nisl euismod euismod. Aliquam eu sapien fermentum turpis dapibus molestie a id felis. Integer fringilla elementum libero, nec accumsan dui finibus vitae. Nam quis posuere lectus. Praesent eget erat dapibus, aliquam enim a, euismod mi. Morbi suscipit lacus a justo cursus varius. Etiam laoreet sit amet mi et vehicula. Integer volutpat ut leo in vestibulum. Quisque aliquet, eros at efficitur suscipit, tellus ante semper enim, at cursus sapien nisi sit amet leo. Morbi sit amet ligula hendrerit, convallis quam vel, mattis purus. Pellentesque vehicula, est sit amet eleifend sagittis, sem neque sodales magna, in aliquet lacus dolor sed turpis. Curabitur vitae lectus ac quam mollis varius tempor eget augue. Vestibulum lacinia dolor ut turpis pellentesque sodales. Pellentesque ac risus blandit, placerat nisi eget, rutrum erat.

                    Fusce mauris augue, accumsan eget viverra vel, ultrices vel nulla. Phasellus gravida sit amet risus sit amet vestibulum. Morbi vel cursus est. Maecenas dignissim, magna non facilisis semper, risus magna auctor elit, vitae tincidunt turpis mi eu leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam eu iaculis metus, id ultrices est. Fusce in diam sit amet felis sagittis posuere bibendum quis tellus. Aenean porttitor augue sit amet tortor interdum, ut faucibus ipsum cursus. Aenean a nulla diam. Morbi in luctus arcu. Vestibulum feugiat risus erat, eget eleifend justo pretium quis. Morbi sed tellus sed erat tincidunt sollicitudin vel et dui.
                  </td>
                </tr>
              </tbody>
            </table>
                            <table style="width:100%;">
              <thead>
                <tr>
                  <td colspan="6">Comentarios</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button id="btnPrev">Prev</button>
                    <button id="btnNext">Next</button>
                  </td>
                  <td colspan="5">
                    <div id="comentariosContainer" style="position: relative; overflow: hidden;">
                      <ul id="comentarios" style="margin: 0;padding: 0;list-style-type: none;">
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, repellat beatae tempore, doloribus officiis porro quia natus illum et, necessitatibus quisquam inventore sequi nemo neque provident libero atque praesentium? Culpa?</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, laborum. Quam odio omnis architecto? Veniam, sapiente! Deleniti explicabo perferendis saepe, illum consequatur, optio similique quam voluptatibus quaerat magnam numquam veniam.</li>
                        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit magnam cum, placeat, ad incidunt dolore labore nam doloremque vero, esse nihil modi repudiandae reiciendis id culpa laborum accusamus consectetur neque.</li>
                        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, beatae, inventore neque, libero similique enim repellendus tempora iste error ad nulla ipsum voluptas expedita praesentium consequatur saepe architecto id? Nam.</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <td colspan="6">Portfolio</td>
                </tr>
              </thead>
              <tbody>
                <tr>                  
                  <td colspan="6">
                    <div id="comentariosContainer" style="position: relative; overflow: hidden;">
                      <ul id="portfolio" style="margin: 0;padding: 0;list-style-type: none;">
                        <li style="display: flex;">
                          <img src="https://source.unsplash.com/random/200x100?sig=1" alt="Imagen aleatoria">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, repellat beatae tempore, doloribus officiis porro quia natus illum et, necessitatibus quisquam inventore sequi nemo neque provident libero atque praesentium? Culpa?</p>
                        </li>
                        <li style="display: flex;">
                          <img src="https://source.unsplash.com/random/200x100?sig=2" alt="Imagen aleatoria">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, laborum. Quam odio omnis architecto? Veniam, sapiente! Deleniti explicabo perferendis saepe, illum consequatur, optio similique quam voluptatibus quaerat magnam numquam veniam.</p>
                        </li>
                        <li style="display: flex;">
                          <img src="https://source.unsplash.com/random/200x100?sig=3" alt="Imagen aleatoria">
                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit magnam cum, placeat, ad incidunt dolore labore nam doloremque vero, esse nihil modi repudiandae reiciendis id culpa laborum accusamus consectetur neque.</p>
                        </li>
                        <li style="display: flex;">
                          <img src="https://source.unsplash.com/random/200x100?sig=4" alt="Imagen aleatoria">
                          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, beatae, inventore neque, libero similique enim repellendus tempora iste error ad nulla ipsum voluptas expedita praesentium consequatur saepe architecto id? Nam.</p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">                    
                    <button id="btnPrevPortfolio" style="width: 100%;">Prev</button>
                  </td>
                  <td colspan="3">
                    <button id="btnNextPortfolio" style="width: 100%;">Next</button>
                  </td>
                </tr>
              </tbody>
            </table>
        </td>
      </tr>
      <tr class="d-none"></tr>`;
    fila.insertAdjacentHTML("afterend", sigFilaHTML);
  }
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

function setAnimacionesCarrousel(){
  let comentarios = document.querySelector("#comentarios").children;
  let btnNext = document.querySelector("#btnNext");
  let btnPrev = document.querySelector("#btnPrev");
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


  var portfolioItems = document.querySelectorAll('#portfolio li');
  var btnNextPortfolio = document.getElementById('btnNextPortfolio');
  var btnPrevPortfolio = document.getElementById('btnPrevPortfolio');
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

      // TODO: CAMBIAR 4 POR LA CANTIDAD REAL DE ITEMS
      if (indexPortfolio < 4) {
        // Mostrar el siguiente elemento del portfolio
        portfolioItems[indexPortfolio].style.display = "flex";
        portfolioItems[indexPortfolio].classList.add("slide-in-left");
      } else {
        // Si el índice no es válido, mostrar el primer elemento
        portfolioItems[0].style.display = "flex";
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
        portfolioItems[indexPortfolio].style.display = "flex";
        portfolioItems[indexPortfolio].classList.add("slide-in-right");
      } else {
        // Si el índice no es válido, mostrar el último elemento
        // TODO: CAMBIAR 4 POR LA CANTIDAD REAL DE ITEMS
        portfolioItems[4 - 1].style.display = "flex";
        indexPortfolio = 4 - 1;
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

cargarIntegrantesNeo4j();
crearEncabezado();
agregarBotonACadaFila();
agregarEstilos();
setAnimacionesCarrousel()