import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ButtonAppBar from './components/AppBar.tsx'
import PanelNotas from './components/NotesPAnel.tsx'
import { NotesProvider } from './Context/notesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotesProvider>
    <ButtonAppBar />
    <PanelNotas />
    </NotesProvider>
  </StrictMode>,
)
