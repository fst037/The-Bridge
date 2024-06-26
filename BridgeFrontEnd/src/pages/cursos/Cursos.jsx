import React, { useState } from 'react';
import { Modal } from "../../components/Modal";
import CreateCourseModal from './CreateCourseModal'; 
import { AddActionButton } from "../../components/AddActionButton";
import { useCardToggle } from '../../hooks/useCardToggle';


export const Cursos = () => {
  const {isOpen, setIsOpen, cardRef} = useCardToggle();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreateCourse = (courseName) => {
    console.log(`Curso creado: ${courseName}`);
  };

  return (
    <section>
      <div className="p-8">
        <div className="flex items-center gap-4">
          <h3 className="text-4xl text-gray-400/80">Mis Cursos</h3>
          <AddActionButton text={"Agregar +"} className="w-max" onClick={openModal} />
          <CreateCourseModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleCreateCourse} />
        </div>
        <article className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          <p>Curso 1</p>
          
        </article>
      </div>
      
    </section>
  ) 
};
