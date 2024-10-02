// src/componentes/NotaDialog.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface NotaDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (id: string | null, title: string, content: string) => void;
  onDelete?: (id: string) => void;
  nota?: { id: string; title: string; content: string } | null; 
}

const NotaDialog: React.FC<NotaDialogProps> = ({ open, onClose, onSave, onDelete, nota }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (nota) {
      setTitle(nota.title);
      setContent(nota.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [nota]);

  const handleSave = () => {
    onSave(nota?.id || null, title, content);
    onClose();
  };

  const handleDelete = () => {
    if (nota && onDelete) {
      onDelete(nota.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{nota ? 'Editar Nota' : 'Agregar Nota'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        {nota && (
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        )}
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          {nota ? 'Guardar Cambios' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotaDialog;
