import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import CustomCard from '../components/notes'; // Asegúrate de que la ruta sea correcta

interface DraggableNoteProps {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  position: { x: number; y: number };
}

const DraggableNote: React.FC<DraggableNoteProps> = ({ id, title, content, backgroundColor,position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform) + ` translate(${position.x}px, ${position.y}px)`, // Aplicar la posición

  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CustomCard title={title} content={content} backgroundColor={backgroundColor} />
    </div>
  );
};

export default DraggableNote;