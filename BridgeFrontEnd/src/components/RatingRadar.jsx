import { Link } from "react-router-dom";
import { SkillsRadar } from "./SkillsRadar";
import { useAuthContext } from "../context/AuthContext";
import { useCardToggle } from "../hooks/useCardToggle";
import { ValorarPerfilModal } from "./ValorarPerfilModal";

export const RatingRadar = ({ skills, username }) => {
  const authUser = useAuthContext().authUser;
  const { cardRef, isOpen, setIsOpen } = useCardToggle();

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
        <SkillsRadar skills={skills} />
        {authUser.email == username ? (
          <Link to={"./encuesta"} className="">
            <button className="self-end bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white disabled:bg-[#D96756] w-full mt-4">
              Puedes actualizar tus habilidades haciendo click aqui
            </button>
          </Link>
        ) : (
          <button
            className="self-end bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white disabled:bg-[#D96756] w-full mt-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            Valorar habilidades del perfil
          </button>
        )}
      </div>
      <ValorarPerfilModal
        cardRef={cardRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
      />
    </div>
  );
};
