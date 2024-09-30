// notesReducer.ts
import { Note, State, Action } from '../Context/notesContext'; // Asegúrate de que las rutas sean correctas

// Reducer para manejar el estado de las notas
const notesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_NOTE':
      // Agregar una nueva nota al estado
      return { notes: [...state.notes, action.payload] }; // Retornar un nuevo estado con la nota añadida
    case 'REMOVE_NOTE':
      // Eliminar una nota del estado usando su ID
      return { notes: state.notes.filter(note => note.id !== action.payload) }; // Retornar un nuevo estado sin la nota eliminada
    default:
      return state; // Retornar el estado actual si no se reconoce la acción
  }
};

export default notesReducer;
