import { useState } from "react";
import { useMutation } from "react-query";
import { AddActionButton } from "../../components/AddActionButton";
import { submitForm } from "../../services/submitForm";
import toast from "react-hot-toast";

const Encuesta = () => {
  const [responses, setResponses] = useState([]);

  const { mutate, isLoading } = useMutation(submitForm, {
    onSuccess: () => {
      toast.success("Formulario enviado correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (responses.length < 10) {
      toast.error("Debes responder todas las preguntas");
      return;
    }
    mutate(responses);
  };

  const questions = [
    {
      pregunta: "¿Cómo abordarías un nuevo proyecto en tu equipo?",
      respuestas: [
        {
          text: "Coordinar a todos y delegar tareas claras.",
          value: "Liderazgo",
        },
        {
          text: "Organizar un plan detallado antes de comenzar.",
          value: "Organización",
        },
        {
          text: "Proponer ideas innovadoras para el proyecto.",
          value: "Ideación",
        },
        {
          text: "Trabajar en las tareas técnicas del proyecto.",
          value: "Desarrollo",
        },
        {
          text: "Comunicar claramente las metas y objetivos.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta: "¿Cómo reaccionas ante un conflicto en el equipo?",
      respuestas: [
        {
          text: "Tomo la iniciativa para mediar y resolver el conflicto.",
          value: "Liderazgo",
        },
        {
          text: "Organizo una reunión para abordar el conflicto.",
          value: "Organización",
        },
        {
          text: "Sugiero soluciones creativas para el conflicto.",
          value: "Ideación",
        },
        {
          text: "Me enfoco en encontrar la raíz técnica del problema.",
          value: "Desarrollo",
        },
        {
          text: "Facilito la comunicación entre las partes.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta: "¿Cómo te sientes al trabajar en un equipo multicultural?",
      respuestas: [
        {
          text: "Lidero el equipo y valoro las diferentes perspectivas.",
          value: "Liderazgo",
        },
        {
          text: "Organizo y coordino esfuerzos para la inclusión.",
          value: "Organización",
        },
        {
          text: "Promuevo ideas creativas que integren todas las culturas.",
          value: "Ideación",
        },
        {
          text: "Trabajo en adaptar las soluciones técnicas a las diversas necesidades.",
          value: "Desarrollo",
        },
        {
          text: "Facilito la comunicación intercultural y la comprensión mutua.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta: "¿Cómo gestionas las tareas diarias?",
      respuestas: [
        { text: "Delego tareas y lidero el equipo.", value: "Liderazgo" },
        { text: "Hago una lista de tareas y priorizo.", value: "Organización" },
        {
          text: "Busco maneras innovadoras de hacer las tareas más eficientes.",
          value: "Ideación",
        },
        {
          text: "Me concentro en completar cada tarea con precisión técnica.",
          value: "Desarrollo",
        },
        {
          text: "Comunico mi progreso y cualquier dificultad a mis compañeros.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta:
        "¿Cómo te sentirías al ser el portavoz de tu equipo en una reunión importante?",
      respuestas: [
        { text: "Asumo el rol con confianza y liderazgo.", value: "Liderazgo" },
        {
          text: "Preparo y organizo toda la información necesaria.",
          value: "Organización",
        },
        {
          text: "Presento ideas innovadoras durante la reunión.",
          value: "Ideación",
        },
        {
          text: "Me enfoco en explicar los aspectos técnicos con claridad.",
          value: "Desarrollo",
        },
        {
          text: "Comunico claramente y respondo preguntas eficazmente.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta: "¿Qué harías para motivar a tu equipo en un proyecto largo?",
      respuestas: [
        { text: "Lidero con entusiasmo y doy ejemplo.", value: "Liderazgo" },
        {
          text: "Organizo actividades de equipo para mantener la moral alta.",
          value: "Organización",
        },
        {
          text: "Sugiero nuevas ideas para mantener el interés.",
          value: "Ideación",
        },
        {
          text: "Me enfoco en los logros técnicos alcanzados.",
          value: "Desarrollo",
        },
        {
          text: "Comunico los éxitos y próximos pasos del proyecto.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta: "¿Qué buscas aportar en un equipo de trabajo?",
      respuestas: [
        { text: "Un líder fuerte que guíe al equipo.", value: "Liderazgo" },
        {
          text: "Una buena organización y planificación.",
          value: "Organización",
        },
        {
          text: "Ideas creativas y soluciones innovadoras.",
          value: "Ideación",
        },
        {
          text: "Habilidades técnicas y capacidad de desarrollo.",
          value: "Desarrollo",
        },
        { text: "Una comunicación efectiva y clara.", value: "Comunicación" },
      ],
    },
    {
      pregunta: "¿Cómo manejas el feedback negativo sobre tu trabajo?",
      respuestas: [
        {
          text: "Acepto el feedback y lidero cambios necesarios.",
          value: "Liderazgo",
        },
        {
          text: "Organizo y priorizo las áreas a mejorar.",
          value: "Organización",
        },
        {
          text: "Pienso en nuevas ideas para mejorar mi trabajo.",
          value: "Ideación",
        },
        {
          text: "Me concentro en los aspectos técnicos a mejorar.",
          value: "Desarrollo",
        },
        {
          text: "Comunico con claridad cómo planeo mejorar.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta: "¿Qué harías si tu equipo no está cumpliendo con los plazos?",
      respuestas: [
        {
          text: "Me siento determinado, y preparado para sacar el grupo adelante.",
          value: "Liderazgo",
        },
        {
          text: "Siento una gran responsabilidad y necesidad de mantener todo ordenado para la claridad del resto.",
          value: "Organización",
        },
        {
          text: "Siento que este rol puede ser de otro, pero de caer la responsabilidad en mi, iré con un ángulo creativo.",
          value: "Ideación",
        },
        {
          text: "No me siento cómodo con el rol, prefiero seguir las direcciones de otra persona, más que darlas.",
          value: "Desarrollo",
        },
        {
          text: "Me siento nervioso, pero si nos comunicamos no debería de haber muchos problemas.",
          value: "Comunicación",
        },
      ],
    },
    {
      pregunta:
        "¿Qué harías si necesitas aprender una nueva habilidad para tu trabajo?",
      respuestas: [
        {
          text: "Tomo la iniciativa y lidero mi propio aprendizaje.",
          value: "Liderazgo",
        },
        {
          text: "Organizo un plan de estudio y seguimiento para aprender.",
          value: "Organización",
        },
        {
          text: "Pienso en maneras creativas de aprender y aplicar la nueva habilidad.",
          value: "Ideación",
        },
        {
          text: "Me enfoco en la práctica técnica para dominar la habilidad.",
          value: "Desarrollo",
        },
        {
          text: "Comunico mis progresos y busco feedback continuamente.",
          value: "Comunicación",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center m-10 w-auto">
      <form className="border-4 rounded-xl" onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.pregunta} className="p-4 border-b border-gray-300">
            <p>{question.pregunta}</p>
            {question.respuestas.map((respuesta) => (
              <div
                key={`${question.pregunta} ${respuesta.text}`}
                className="p-1"
              >
                <input
                  type="radio"
                  className="mr-4"
                  name={question.pregunta}
                  id={`${question.pregunta} ${respuesta.text}`}
                  onChange={() =>
                    setResponses((prev) => [...prev, respuesta.value])
                  }
                />
                <label htmlFor={`${question.pregunta} ${respuesta.text}`}>
                  {respuesta.text}
                </label>
              </div>
            ))}
          </div>
        ))}
        <AddActionButton
          text={"Enviar"}
          className="mx-1/10 w-4/5 rounded-[15px] m-2"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default Encuesta;
