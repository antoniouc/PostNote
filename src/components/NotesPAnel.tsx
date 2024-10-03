import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
import DraggableNote from '../components/DraggableNote';
import NotaDialog from '../components/ModalNotes';
import ConfirmDialog from '../components/ConfirmDialog'; // Importar el nuevo modal de confirmación

interface Nota {
  id: string;
  title: string;
  content: string;
  background: string;
}

interface Position {
  x: number;
  y: number;
}

export default function PanelNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [positions, setPositions] = useState<{ [key: string]: Position }>({});
  const [selectedNota, setSelectedNota] = useState<Nota | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false); // Estado para manejar el modal de confirmación
  const [notaToDelete, setNotaToDelete] = useState<Nota | null>(null); // Estado para saber qué nota eliminar

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
  
    if (!active || !positions[active.id]) {
      return;
    }
  
    const id = active.id;
  
    // Actualiza la posición de la nota en el estado
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: {
        x: prevPositions[id].x + delta.x,
        y: prevPositions[id].y + delta.y,
      },
    }));
  };
  

  const generatePastelColor = () => {
    const r = Math.floor((Math.random() * 127) + 127);
    const g = Math.floor((Math.random() * 127) + 127);
    const b = Math.floor((Math.random() * 127) + 127);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const agregarNota = (id: string | null, title: string, content: string) => {
    if (id) {
      setNotas((prevNotas) =>
        prevNotas.map((nota) => (nota.id === id ? { ...nota, title, content } : nota))
      );
    } else {
      const nuevaNota: Nota = { id: `${notas.length}`, title, content, background: generatePastelColor() };
      setPositions((prev) => ({
        ...prev,
        [nuevaNota.id]: { x: 0, y: 0 },
      }));
      setNotas([...notas, nuevaNota]);
    }
  };

  const handleOpenDialog = (nota?: Nota) => {
    setSelectedNota(nota || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedNota(null);
  };

  const handleOpenConfirm = (nota: Nota) => {
    setNotaToDelete(nota);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (notaToDelete) {
      setNotas(notas.filter((nota) => nota.id !== notaToDelete.id));
    }
    setConfirmOpen(false);
    setNotaToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setNotaToDelete(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#cfe8fc',
          minHeight: '100vh',
          width: '100%',
          margin: '0',
          padding: '8% 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          sx={{ alignSelf: 'flex-end', marginBottom: '20px', marginRight: '15%' }}
        >
          Agregar Nota
        </Button>

        <DndContext onDragEnd={handleDragEnd}>
          <Box
            sx={{
              position: 'fixed',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              overflow: 'initial',
              maxHeight: '70vh',
            }}
          >
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
                  position={positions[nota.id] || { x: 0, y: 0 }}
                  onClick={() => handleOpenDialog(nota)}
                  onDelete={() => handleOpenConfirm(nota)} // Abre la confirmación para eliminar
  onEdit={() => handleOpenDialog(nota)} // Abre el diálogo para editar
                />
              ))
            )}
          </Box>
        </DndContext>

        {/* Modal de agregar/editar nota */}
        <NotaDialog
  open={dialogOpen}
  onClose={handleCloseDialog}
  onSave={agregarNota}
  onDelete={(id: string) => {
    const nota = notas.find(n => n.id === id);
    if (nota) {
      handleOpenConfirm(nota); // Solo abre el modal si la nota existe
    }
  }}// Vinculamos la eliminación a la apertura del modal de confirmación
  nota={selectedNota}
/>

        {/* Modal de confirmación */}
        <ConfirmDialog
          open={confirmOpen}
          title="Eliminar Nota"
          content={`¿Estás seguro que deseas eliminar la nota "${notaToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Box>
    </React.Fragment>
  );
}
