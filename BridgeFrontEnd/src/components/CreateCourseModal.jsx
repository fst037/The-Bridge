import React, { useState } from 'react';
import { Modal } from "./Modal";
import { AddActionButton } from "./AddActionButton";


const CreateCourseModal = ({ isOpen, setIsOpen, cardRef }) => {
  const {courseName, setCourseName} = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(courseName); // Enviar el nombre del curso al onSubmit
    setIsOpen(false); // Cerrar el modal después de enviar el formulario
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} cardRef= {cardRef} title="Agregar Curso">
      <form onSubmit={handleSubmit} className="modal-content p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md mb-4 md:mb-0 flex-"
          placeholder="ID del curso"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <AddActionButton text={"Agregar +"} className="w-max" />
        </div>
      </form>
      
    </Modal>
  );
};

export default CreateCourseModal;
