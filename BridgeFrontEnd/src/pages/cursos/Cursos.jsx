import React, { useState } from 'react';
import { useCardToggle } from '../../hooks/useCardToggle';
import { InfoCard } from "../../components/InfoCard";
import { getMyCourses } from "../../services/courses";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { Link } from "react-router-dom";

export const Cursos = () => {
  
  const { data: courses } = useQuery("courses", getMyCourses, queryConfig);
  
  return (
    <section>
      <div className="p-8">
        <div className="flex items-center gap-4">
          <h3 className="text-4xl text-gray-400/80">Mis Cursos</h3>
        </div>
        <article className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
        {courses?.map(({ code, year, shift, day, subject }) => (
            <Link to={`/curso/${code}`} key={code}>
            <InfoCard
              key={code}
              title={subject}
              information={[year, day, shift]}
            />
            </Link>
          ))}
          
        </article>
      </div>
      
    </section>
  ) 
};
