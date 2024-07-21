# Bridge MVP - Seminario de Integración Profesional - Ingeniería en Informática - UADE
![](Imagenes/LogoUADE.svg)


## Integrantes
- Bejarano Martin
- Carle Santiago
- Carschmit Donna
- Farao Tomas
- Gomez Patricio
- Massi Franco

## Fecha de Presentación
Miércoles 17/7/2024

## Descripción del Proyecto
![](Imagenes/LogoBridge.png)
Bridge es una solución diseñada para facilitar la formación de equipos de trabajo entre estudiantes universitarios, ayudándolos a conocerse mejor y a colaborar de manera más efectiva. El objetivo es mitigar las dificultades que los estudiantes enfrentan al tener que formar equipos con personas desconocidas y maximizar las oportunidades de networking y colaboración académica.

## Problema Identificado
La dificultad para socializar con desconocidos, aunque inherente a la naturaleza humana social, está influenciada por factores psicológicos y evolutivos como la desconfianza inicial, la preferencia por lo familiar y el temor al rechazo. Evolutivamente, la desconfianza hacia extraños podría haber sido un mecanismo de defensa para minimizar riesgos y maximizar la supervivencia. La preferencia por lo familiar está relacionada con la zona de confort, donde la familiaridad reduce la ansiedad. El temor al rechazo se vincula con la necesidad de pertenencia y aceptación social, esenciales para la supervivencia ancestral. En entornos académicos, como las clases universitarias, estas dinámicas dificultan la formación de equipos efectivos, ya que la desconfianza y la preferencia por trabajar con personas conocidas pueden generar tensiones y afectar la colaboración y calidad del trabajo, aumentando el riesgo de fracaso académico.

### Causas
1. **Falta de Conocimiento entre Estudiantes:** Los estudiantes a menudo no conocen a sus compañeros de clase, lo que dificulta la formación de equipos efectivos.
2. **Diversidad de Habilidades:** Las habilidades blandas y técnicas varían ampliamente entre los estudiantes, y encontrar compañeros con habilidades complementarias puede ser desafiante.
3. **Tiempo Limitado:** El proceso de formar equipos puede ser lento y consumir tiempo valioso que podría dedicarse al estudio y preparación del proyecto.

### Consecuencias
1. **Equipos Ineficientes:** La falta de conocimiento y compatibilidad entre miembros del equipo puede llevar a una colaboración ineficaz y resultados subóptimos.
2. **Estrés y Ansiedad:** La presión de formar equipos puede causar estrés y ansiedad en los estudiantes, afectando su rendimiento académico y bienestar general.
3. **Deserción Escolar:** Las dificultades en la formación de equipos y la consecuente falta de apoyo pueden contribuir a la deserción escolar.

## Fundamentos de la Elección de la Solución
### Solución Propuesta
La solución propuesta es una plataforma digital que utiliza un algoritmo para emparejar a los estudiantes en función de sus habilidades, intereses y perfiles psicológicos. La aplicación permite a los estudiantes crear perfiles detallados, realizar evaluaciones de habilidades blandas, y conectarse con otros estudiantes cuyas habilidades y objetivos complementen los suyos.

### Justificación
1. **Evaluación Personalizada:** La evaluación de habilidades blandas permite una comprensión profunda de las fortalezas y debilidades de cada estudiante.
2. **Emparejamiento Inteligente:** El algoritmo de emparejamiento asegura que los equipos estén compuestos por miembros con habilidades complementarias, mejorando la eficiencia y eficacia de la colaboración.
3. **Interacción Facilitada:** La plataforma proporciona herramientas para que los estudiantes se conozcan mejor antes de trabajar juntos, reduciendo la ansiedad y mejorando la cohesión del equipo.

## Arquitectura de Desarrollo

### 1. Introducción
El proyecto se enfoca en abordar el problema de la dificultad de los estudiantes para conocerse entre sí y formar equipos de trabajo efectivos. Se analizan las causas y consecuencias de este problema y se propone una solución tecnológica que facilite la interacción y colaboración entre estudiantes.

### 2. Proceso de Design Thinking
#### User Personas
Se identificaron diferentes tipos de usuarios para comprender mejor sus necesidades y dolores:
- **User Persona 1:** Estudiante que le cuesta socializar y formar equipos.
![](Imagenes/UserPersona1.png)
![](Imagenes/UserJourneyMap1.png)

- **User Persona 2:** Estudiante con habilidades específicas que busca compañeros con habilidades complementarias.
![](Imagenes/UserPersona2.png)
![](Imagenes/UserJourneyMap2.png)

#### Mapa de Empatía
Se creó un mapa de empatía para cada User Persona, destacando sus pensamientos, sentimientos, y comportamientos relacionados con la formación de equipos.
![](Imagenes/MapaDeEmpatía1.png)
![](Imagenes/MapaDeEmpatía2.png)

### 3. Ideación y Brainstorming
Se realizaron sesiones de brainstorming para generar ideas sobre las características que debe tener la solución. Estas ideas se priorizaron en una grilla de priorización, seleccionando las más relevantes y factibles para el desarrollo del MVP.
![](Imagenes/Brainstorming.png)
![](Imagenes/GrillaDePriorización.png)

### 4. Solución Propuesta
La solución se concretó en una aplicación que permite a los estudiantes cargar su información personal y académica, interactuar con perfiles de otros estudiantes a través de valoraciones y comentarios, y utilizar herramientas para la formación automática de equipos.
![](Imagenes/IdeasElegidas.png)

### 5. Definición del MVP
Se definió el MVP (Producto Mínimo Viable) a través del mapeo de historias de usuario, asegurando que las funcionalidades básicas estuvieran alineadas con las necesidades y problemas identificados.
![](Imagenes/UserStoryMapping.png)

### 6. Modelo de Negocio
Se elaboró un Business Model Canvas para describir la propuesta de valor, segmentos de clientes, canales, y flujos de ingresos. La aplicación será gratuita, con herramientas premium disponibles mediante suscripción.
![](Imagenes/BusinessModelCanva.png)
![](Imagenes/MatrizERIC.png)

### 7. Diseño de Solución
#### Wireframes
Se desarrollaron wireframes para visualizar la interfaz y experiencia de usuario de la aplicación.
![](Imagenes/PantallaInicialBridge.png)
![](Imagenes/PrimeraVezBridge.png)
![](Imagenes/BridgeValoración.png)
![](Imagenes/BridgePerfil.png)


#### Diagrama de Infraestructura
Se diseñó un diagrama de infraestructura que muestra cómo los diferentes componentes del sistema se integran y funcionan juntos.
![](Imagenes/EsquemaGeneralBridge.png)
![](Imagenes/EsquemaServidorSpringBootJava.png)

### 8. Desarrollo del Código
El código de la aplicación fue desarrollado utilizando tecnologías modernas y siguiendo buenas prácticas de desarrollo. Se incluyen pruebas unitarias y de integración para garantizar la calidad del software.
![](Imagenes/EsquemaNeo4j.png)

### Tecnologías Utilizadas

#### Frontend
- **React**: Elegido por su rendimiento, su capacidad para construir interfaces de usuario reutilizables y su vasta comunidad y ecosistema de herramientas.
- **Vite**: Utilizado como herramienta de construcción por su rapidez y su optimización automática de las dependencias.
- **Tailwind CSS**: Elegido por su facilidad para diseñar interfaces consistentes y estilizadas mediante clases utilitarias, lo que acelera el desarrollo y mantenimiento del estilo.

#### Backend
- **Spring Boot**: Seleccionado por su robustez, escalabilidad y la facilidad de configuración para desarrollar microservicios. Ofrece un marco completo para construir aplicaciones web y RESTful.
- **Neo4j**: Elegido como base de datos debido a su enfoque en grafos, que permite una representación y consulta eficientes de relaciones complejas entre estudiantes y proyectos.
- **Maven**: Utilizado para la gestión de dependencias y la construcción del proyecto, asegurando una fácil integración y despliegue.
- **Stanford NLP:** Stanford NLP es un conjunto de herramientas de procesamiento de lenguaje natural desarrollado por la Universidad de Stanford que ofrece modelos avanzados para tareas como el análisis de sentimientos, el reconocimiento de entidades y la descomposición gramatical. Proporciona potentes herramientas para el procesamiento del lenguaje natural, incluyendo análisis de sentimientos. Al integrar Stanford NLP para filtrar comentarios negativos, podemos aprovechar su robusto modelo de análisis de sentimientos para identificar de manera precisa y eficiente el tono negativo en los comentarios. Esto permite mantener un entorno en línea positivo y seguro, mejorando la experiencia del usuario y fomentando interacciones constructivas.

## Instrucciones para Probar la Aplicación

### Requisitos
- Node.js
- Node package manager (npm)
- git
- JDK 17 de Oracle
- IntelliJ IDEA Community Edition

### Front-End

#### Comandos en la Consola

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/fbmassi/The-Bridge

2. Navegar al directorio del frontend
   ```bash
   cd The-Bridge/BridgeFrontEnd/

4. Instalar dependencias
   ```bash
   npm install

6. Ejecutar la aplicación en modo desarrollo
   ```bash
   npm run dev

### Back-End

#### Instrucciones para Iniciar el Backend de Spring Boot

1. **Descargar y Descomprimir el Proyecto:**

   - Descargar el archivo `TheBridgeAPIRest` desde el repositorio GitHub [The Bridge](https://github.com/fbmassi/The-Bridge).
   - Descomprimirlo en la ubicación preferida del sistema.

2. **Instalar JDK 17 de Oracle:**

   - Descargar e instalar JDK 17 desde [Oracle JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).
   - Seguir las instrucciones de instalación proporcionadas por Oracle según el sistema operativo.

3. **Abrir el Proyecto en IntelliJ IDEA:**

   - Abrir IntelliJ IDEA Community Edition.
   - Seleccionar "Abrir Proyecto" y navegar hasta la carpeta `TheBridgeNeo4jApiREST` dentro de la carpeta descomprimida.

4. **Configurar JDK en el Proyecto:**

   - En la estructura de proyecto de IntelliJ, seleccionar JDK 17 como JDK del proyecto.

5. **Cargar Dependencias Maven:**

   - Abrir el archivo `pom.xml` ubicado en `TheBridgeNeo4jApiREST/pom.xml`.
   - Verificar que todas las dependencias Maven estén cargadas correctamente.

6. **Ejecutar la Aplicación Spring Boot:**

   - Encontrar y abrir el archivo principal de la aplicación Spring Boot: `TheBridgeNeo4jApiREST/src/main/java/TheBridge/TheBridgeNeo4jApiREST/TheBridgeNeo4jApiRestApplication.java`.
   - Ejecutar `TheBridgeNeo4jApiRestApplication` haciendo clic derecho en el archivo y seleccionando "Run".

7. **Probar las Funcionalidades del Backend:**

   - Utilizar herramientas como Postman o Insomnia para realizar peticiones HTTP al backend.
   - Simular las interacciones que haría el frontend usando funciones `fetch`.

##### Ejemplos de Uso

###### Devolver un Perfil

1. **Consulta:**

   - Utilizar una herramienta como Postman o cualquier cliente HTTP para enviar una solicitud GET al endpoint: `http://localhost:8080/api/v1/profile/?username=<mail>`.
   - Reemplazar `<mail>` con el correo electrónico deseado, por ejemplo, `dcarschmit@uade.edu.ar`.

2. **Probar la Consulta:**

   - Ejecutar la solicitud GET y esperar la respuesta del servidor.
   - La API devolverá el perfil del usuario asociado al correo electrónico proporcionado en formato JSON.

3. **Ejemplo de Respuesta:**

   ```json
   {
       "name": "Carschmit, Donna Isabel",
       "username": "dcarschmit@uade.edu.ar",
       "legajo": "1156247",
       "introduction": null,
       "skills": {
           "Creatividad": 0.33333334,
           "Empatia": 0.33333334,
           "PensamientoCritico": 0.33333334
       },
       "comments": [
           {
               "mensaje": "gran compañero de equipo",
               "remitente": "sacarle@uade.edu.ar",
               "destinatario": "dcarschmit@uade.edu.ar",
               "timestamp": "2024-06-11T21:50:16.840179100"
           }
       ],
       "projects": [
           {
               "identifier": "34db8a05-d78e-4407-b010-174165d90f48",
               "titulo": "Bridge",
               "descripcion": "Herramienta que permite a los estudiantes conectar entre si",
               "links": [
                   "https://github.com/fst037/The-Bridge",
                   "https://www.figma.com/design/GqKfoL0bnjsRdFHjO6Wglj/Untitled?node-id=0-1&t=0GN5pPjHXiLmTH0F-0"
               ],
               "portadaBase64": "asd6f5a6s7dfa87sdf587saf67s5sd",
               "equipo": {
                   "identifier": "ab7f0732-6fd6-4917-9920-2e8cacaecc93",
                   "nombre": "Equipo Bridge"
               },
               "curso": {
                   "code": "473841",
                   "name": "2024-1C - SIN AULA - TARDE - MIE - SEMINARIO DE INTEGRACION PROFESIONAL"
               }
           }
       ]
   }

4. **Notas Adicionales:** Asegurarse de que el servidor esté en ejecución antes de realizar la consulta.

##### Instrucciones para Obtener Todas las Materias

1. **Consulta:**

   - Utilizar una herramienta como Postman o cualquier cliente HTTP para enviar una solicitud GET al endpoint: `http://localhost:8080/api/v1/carreras-materias/todasLasMaterias`.

2. **Probar la Consulta:**

   - Ejecutar la solicitud GET y esperar la respuesta del servidor.
   - La API devolverá un arreglo JSON con todas las materias disponibles, cada una representada por un objeto con campos como "name" (nombre de la materia) y "code" (código de la materia).

3. **Ejemplo de Respuesta:**

   ```json
   [
       {
           "name": "Seminario de Integración Profesional",
           "code": "3.4.211"
       },
       {
           "name": "Probabilidad y Estadística",
           "code": "3.1.053"
       },
       {
           "name": "Ingeniería de Datos II",
           "code": "3.4.209"
       },
       {
           "name": "Teleinformática y Redes",
           "code": "3.4.078"
       },
       {
           "name": "Proceso de Desarrollo de Software",
           "code": "3.4.208"
       }
   ]

4. **Notas Adicionales:** Asegurarse de que el servidor esté en ejecución antes de realizar la consulta.

##### Obtener Todos los Usuarios de un Curso

1. **Consulta:**

   - Utilizar una herramienta como Postman o cualquier cliente HTTP para enviar una solicitud GET al endpoint: `http://localhost:8080/api/v1/cursos/usuariosDeCurso?courseCode=<codigoDeCurso>`.
   - Reemplazar `<codigoDeCurso>` con el código del curso deseado, por ejemplo, `473841`.

2. **Probar la Consulta:**

   - Ejecutar la solicitud GET y esperar la respuesta del servidor.
   - La API devolverá un arreglo JSON con todos los usuarios del curso especificado.

3. **Ejemplo de Respuesta:**

   ```json
   {
       "name": "2024-1C - SIN AULA - TARDE - MIE - SEMINARIO DE INTEGRACION PROFESIONAL",
       "code": "473841",
       "users": [
           {
               "name": "Gil, Valentino",
               "username": "vgil@uade.edu.ar",
               "legajo": "1149275"
           }
           // ... más usuarios
       ]
   }

4. **Notas Adicionales:** Asegurarse de que el servidor esté en ejecución antes de realizar la consulta.


## Repositorio
El código fuente y la documentación adicional están disponibles en este repositorio.

## Contacto
Para más información, puedes contactarnos a través de los siguientes medios:
- Email: contacto@bridge-sipi.com
- Teléfono: +54 11 1234-5678

![](Imagenes/LogoPrincipal.png)
