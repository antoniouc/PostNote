// src/componentes/NotaDialog.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import {z} from 'zod';
// Esquema de validación con Zod
const notaSchema = z.object({
  title: z.string().min(2, { message: "El título no puede estar vacío" }),
  content: z.string().min(2, { message: "El contenido no puede estar vacío" }),
});

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
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    if (nota) {
      setTitle(nota.title);
      setContent(nota.content);
    } else {
      setTitle(' ');
      setContent(' ');
    }
  }, [nota]);


  const handleSave = () => {
    // Validar los campos usando Zod
    const result = notaSchema.safeParse({ title, content });

    if (!result.success) {
      // Si la validación falla, establecer errores
      const validationErrors = result.error.format();
      setErrors({
        title: validationErrors.title?._errors[0],
        content: validationErrors.content?._errors[0],
      });
      return;
    }

    // Si la validación es exitosa, guardar la nota y cerrar el modal
    onSave(nota?.id || null, title, content);
    onClose();
    setTitle(' ');
    setContent(' ');
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
          error={!!errors.title} // Mostrar error si hay
          helperText={errors.title} // Mensaje de error de validación
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          error={!!errors.content} // Mostrar error si hay
          helperText={errors.content} // Mensaje de error de validación
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
