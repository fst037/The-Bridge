import { Link } from "react-router-dom";

export const SinRatings = () => {
  return (
    <article className="flex flex-col text-center gap-4 md:gap-12 p-4 md:p-8 max-w-[500px] border border-gray-300 rounded-lg">
      <p className="text-lg font-[500]">
        uh!, parece que no hiciste la encuesta
      </p>
      <p>
        Sin la encuesta no somos capazes de predecir tus habilidades. Puedes
        hacer la encuesta{" "}
        <Link className="text-blue-500 hover:underline hover:text-blue-600 active:text-blue-700">
          aquí
        </Link>
      </p>
    </article>
  );
};
