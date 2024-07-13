import { Link } from "react-router-dom";
import { SkillsRadar } from "./SkillsRadar";

export const RatingRadar = ({ skills}) => {

  if (!skills) {
    return (
      <div className="flex justify-center">
        <article className="flex flex-col text-center gap-4 md:gap-12 p-4 md:p-8 max-w-[500px] border border-gray-300 rounded-lg">
          <p className="text-lg font-[500]">
            ¡Uh oh! Parece que no has completado la encuesta.
          </p>
          <p>
            Sin la encuesta no podemos predecir tus habilidades. Puedes
            realizarla{" "}
            <Link
              className="text-blue-500 hover:underline hover:text-blue-600 active:text-blue-700"
              to="./encuesta"
            >
              aquí
            </Link>
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center border border-gray-300 rounded-lg p-4">
      <h4 className="text-xl font-[500]">Skills</h4>
      <div className="min-h-[200px]">
        <SkillsRadar skills={skills}/>
      </div>           
    </div>
  );
};
