import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
import DraggableNote from '../components/DraggableNote';

// Definimos la interfaz para las notas
interface Nota {
  id: string;
  title: string;
  content: string;
  background: string;
  
}

// Interfaz para definir las posiciones de las notas
interface Position {
  x: number;
  y: number;
}

export default function PanelNotas() {
  // Definimos el tipo de notas usando la interfaz Nota
  const [notas, setNotas] = useState<Nota[]>([]);
  // Cambiamos el tipo de positions para que acepte un objeto con claves string y valores de tipo Position
  const [positions, setPositions] = useState<{ [key: string]: Position }>({});

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      const { id } = active;
      const delta = { x: event.delta.x, y: event.delta.y };
  
      setPositions((prevPositions) => ({
        ...prevPositions,
        [id]: {
          x: (prevPositions[id]?.x || 0) + delta.x,
          y: (prevPositions[id]?.y || 0) + delta.y,
        },
      }));
    }
  };

  const generatePastelColor = () => {
    const r = Math.floor((Math.random() * 127) + 127);
    const g = Math.floor((Math.random() * 127) + 127);
    const b = Math.floor((Math.random() * 127) + 127);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  // Función para agregar una nueva nota
  const agregarNota = () => {
    const nuevaNota: Nota = { id: `${notas.length}`, title: `Nueva Nota ${notas.length + 1}`, content: 'Este es el contenido de una nueva nota.', background: generatePastelColor() };
    setPositions((prev) => ({
      ...prev,
      [nuevaNota.id]: { x: 0, y: 0 }, // Posición inicial en (0, 0)
    }));
    setNotas([...notas, nuevaNota]);
     // Actualiza el estado agregando la nueva nota
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Box
        sx={{
          bgcolor: '#cfe8fc',
          height: '100vh',
          width: '100%',
          margin: '0',
          padding: '8% 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Botón para agregar una nueva nota */}
        <Button
          variant="contained"
          color="primary"
          onClick={agregarNota}
          sx={{ alignSelf: 'flex-end', marginBottom: '20px', marginRight: '15%' }}
        >
          Agregar Nota
        </Button>

        {/* Contenedor con scroll para las notas */}
        <DndContext  onDragEnd={handleDragEnd}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
             overflowY:'auto',
              maxHeight: '70vh',
            }}
          >
            {/* Mostrar un mensaje si no hay notas */}
            {notas.length === 0 ? (
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                No hay notas disponibles. Agrega una nueva nota.
              </Typography>
            ) : (
              notas.map((nota) => (
                <DraggableNote
                key={nota.id}
                id={nota.id}
                title={nota.title}
                content={nota.content}
                backgroundColor={nota.background}
                position={positions[nota.id] || { x: 0, y: 0 }} // Establecer posición por defecto si no existe
                />
                
              ))
            )}
          </Box>
        </DndContext>
      </Box>
    </React.Fragment>
  );
}
