import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
import DraggableNote from '../components/DraggableNote';
import NotaDialog from '../components/ModalNotes';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  // Cambiamos el tipo de positions para que acepte un objeto con claves string y valores de tipo Position
  const [positions, setPositions] = useState<{ [key: string]: Position }>({});
  const [selectedNota, setSelectedNota] = useState<Nota | null>(null);

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
  const agregarNota =  (id: string | null, title: string, content: string) => {

    if (id) {
      // Editar nota existente
      setNotas((prevNotas) =>
        prevNotas.map((nota) =>
          nota.id === id ? { ...nota, title, content } : nota
        )
      );
    } else {
    const nuevaNota: Nota = { id: `${notas.length}`, title, content, background: generatePastelColor() };
    setPositions((prev) => ({
      ...prev,
      [nuevaNota.id]: { x: 0, y: 0 }, // Posición inicial en (0, 0)
    }));
    setNotas([...notas, nuevaNota]);
    // Actualiza el estado agregando la nueva nota
  }
  };

  const eliminarNota = (id: string) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };
  // Función para seleccionar una nota
  const handleOpenDialog = (nota?: Nota) => {
    
    setSelectedNota(nota || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedNota(null);
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
          onClick={() => handleOpenDialog()}
          sx={{ alignSelf: 'flex-end', marginBottom: '20px', marginRight: '15%' }}
        >
          Agregar Nota
        </Button>

        {/* Contenedor con scroll para las notas */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              overflow: 'auto',
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
                  position={positions[nota.id] || { x:0 , y: 0 }}
                  onClick={() => handleOpenDialog(nota)} // Establecer posición por defecto si no existe
                />

              ))
            )}
          </Box>
        </DndContext>
        <NotaDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSave={agregarNota}
          onDelete={eliminarNota}
          nota={selectedNota}
       />
      </Box>
    </React.Fragment>
  );
}
