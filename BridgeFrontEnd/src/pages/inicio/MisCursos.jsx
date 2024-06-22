import { InfoCard } from "../../components/InfoCard";
import { getMyCourses } from "../../services/courses";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export const MisCursos = () => {
  const { data: courses } = useQuery("courses", getMyCourses, {
    retry: false,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section>
      <div className="mt-2">
        <h3 className="text-3xl">Mis Cursos</h3>
        <article className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          {courses?.map(({ code, year, shift, day, subject }) => (
            <InfoCard
              key={code}
              title={subject}
              information={[year, day, shift]}
            />
          ))}
        </article>
      </div>
    </section>
  );
};
