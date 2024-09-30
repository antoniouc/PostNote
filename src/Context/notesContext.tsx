// NotesContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';
import notesReducer from '../reducers/notesReducer'; // Importar el reducer

// Definir el tipo de una nota
export type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
};

// Tipo del estado que contiene un arreglo de notas
export type State = {
  notes: Note[];
};

// Tipo de acciones que se pueden realizar en el estado
export type Action = 
  | { type: 'ADD_NOTE'; payload: Note }    
  | { type: 'REMOVE_NOTE'; payload: string };

// Crear el contexto de notas
const NotesContext = createContext<{
  state: State;                          
  dispatch: React.Dispatch<Action>;      
}>({ state: { notes: [] }, dispatch: () => null }); 

// Proveedor del contexto de notas
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  // Usar useReducer para manejar el estado de las notas
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });

  return (
    // Proveer el estado y la función dispatch a los componentes hijos
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

// Exportar el contexto para ser usado en otros componentes
export default NotesContext;

