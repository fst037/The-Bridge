import { InfoCard } from "../../components/InfoCard";
import { getMyCourses } from "../../services/courses";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { Link } from "react-router-dom";

export const MisCursos = () => {
  const { data: courses } = useQuery("courses", getMyCourses, queryConfig);

  return (
    <section>
      <div className="mt-2">
        <h3 className="text-3xl">Mis Cursos</h3>
        <article className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          {courses?.map(({ code, name, shift, day, period }) => (
            <Link to={`/curso/${code}`} key={code}>
            <InfoCard
              key={code}
              title={name}
              information={[code, day, shift, period]}
            />
            </Link>
          ))}
        </article>
      </div>
    </section>
  );
};
