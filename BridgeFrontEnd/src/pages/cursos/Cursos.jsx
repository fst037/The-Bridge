import { useState, useMemo } from "react";
import { InfoCard } from "../../components/InfoCard";
import { getMyCourses } from "../../services/courses";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { Link } from "react-router-dom";

export const Cursos = () => {
  const { data: courses } = useQuery("courses", getMyCourses, queryConfig);
  const [searchParams, setSearchParams] = useState({
    name: "",
    period: "",
    day: "",
  });

  const filteredCourses = useMemo(() => {
    if (courses && courses.length > 0) {
      return courses.filter((course) => {
        return (
          course?.name
            .toLowerCase()
            .includes(searchParams.name.toLowerCase()) &&
          course.day?.toLowerCase().includes(searchParams.day.toLowerCase()) &&
          course?.period
            .toLowerCase()
            .includes(searchParams.period.toLowerCase())
        );
      });
    }
    return [];
  }, [courses, searchParams.name, searchParams.day, searchParams.period]);

  return (
    <section>
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-4xl text-gray-400/80">Mis Cursos</h3>
        </div>
        <div className="flex mt-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Buscar curso"
            value={searchParams.name}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg p-4 mb-4 md:mb-0"
          />
          <select
            value={searchParams.period}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, period: e.target.value }))
            }
            className="w-full md:w-fit border border-gray-300 rounded-lg p-4 md:ml-4 mb-4 md:mb-0"
          >
            <option value="">ANY</option>
            {courses
              ?.map((course) => course.period)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
          </select>
          <select
            value={searchParams.day}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, day: e.target.value }))
            }
            className="w-full md:w-fit border border-gray-300 rounded-lg p-4 md:ml-4"
          >
            <option value="">ANY</option>
            <option value="LUN">LUNES</option>
            <option value="MAR">MARTES</option>
            <option value="MIE">MIERCOLES</option>
            <option value="JUE">JUEVES</option>
            <option value="VIE">VIERNES</option>
            <option value="SAB">SABADO</option>
            <option value="DOM">DOMINGO</option>
          </select>
        </div>

        <article className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          {filteredCourses.map(({ code, name, shift, day, period }) => (
            <Link to={`/curso/${code}`} key={code}>
              <InfoCard
                key={code}
                title={name}
                information={[code, day, shift, period]}
                className="w-full"
              />
            </Link>
          ))}
        </article>
      </div>
    </section>
  );
};
