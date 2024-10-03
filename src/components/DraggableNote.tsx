import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import CustomCard from '../components/notes'; // Asegúrate de que la ruta sea correcta
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface DraggableNoteProps {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  position: { x: number; y: number };
  onClick: () => void; 
  onDelete: () => void; // Función para eliminar
  onEdit: () => void;   // Función para editar
}

const DraggableNote: React.FC<DraggableNoteProps> = ({ id, title, content, backgroundColor,position , onClick, onDelete, onEdit}) => {
  const { attributes, listeners, setNodeRef, transform ,} = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform) + ` translate(${position.x}px, ${position.y}px)`, // Aplicar la posición

  };

  return (
    <div className='draggable-note' ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={onClick}>
        <div className="icons-container">
        <EditIcon className="icon" onClick={onEdit} />
        <DeleteIcon className="icon" onClick={onDelete} />
      </div>
      <CustomCard title={title} content={content} backgroundColor={backgroundColor} />
    </div>
  );
};

export default DraggableNote;