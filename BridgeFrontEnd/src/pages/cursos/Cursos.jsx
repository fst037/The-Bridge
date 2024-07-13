import React, { useEffect, useState } from 'react';
import { useCardToggle } from '../../hooks/useCardToggle';
import { InfoCard } from "../../components/InfoCard";
import { getMyCourses } from "../../services/courses";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { Link } from "react-router-dom";

export const Cursos = () => {
  
  const { data: courses, isLoading } = useQuery("courses", getMyCourses, queryConfig);
  const [searchName, setSearchName] = useState("");
  const [searchPeriod, setSearchPeriod] = useState("");
  const [searchDay, setSearchDay] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    if (courses && courses.length > 0) {
      setFilteredCourses(courses.filter((course) => {
        return course?.name.toLowerCase().includes(searchName.toLowerCase()) && course.day?.toLowerCase().includes(searchDay.toLowerCase()) && course?.period.toLowerCase().includes(searchPeriod.toLowerCase());
      }));        
    }
    
  }, [courses, searchName, searchPeriod, searchDay]);
  
  return (
    <section>
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-4">
          <h3 className="text-4xl text-gray-400/80">Mis Cursos</h3>
        </div>
        <div className='flex mt-4 flex-col md:flex-row'>
          <input type="text" placeholder="Buscar curso" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-4 mb-4 md:mb-0" />
          <select value={searchPeriod} onChange={(e) => setSearchPeriod(e.target.value)} className="w-full md:w-fit border border-gray-300 rounded-lg p-4 md:ml-4 mb-4 md:mb-0">
            <option value="">ANY</option>
            {
              courses?.map(course => course.period).filter((value, index, self) => self.indexOf(value) === index).map((period) => (
                <option key={period} value={period}>{period}</option>
              ))
            }
          </select>
          <select value={searchDay} onChange={(e) => setSearchDay(e.target.value)} className="w-full md:w-fit border border-gray-300 rounded-lg p-4 md:ml-4">
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
        {filteredCourses?.map(({ code, name, shift, day, period }) => (
            <Link to={`/curso/${code}`} key={code} >              
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
  ) 
};
