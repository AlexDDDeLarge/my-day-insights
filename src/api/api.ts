import { NoteType } from "../redux/reducers/notesReducer";

export const apiLocalStorage = {
  getAllNotes: (): Array<NoteType> | null => {
    const notesJson = localStorage.getItem('notes')
    if (typeof notesJson === "string") {
      return JSON.parse(notesJson);
    }
    return []
  },
  updateNotes: (notes: Array<NoteType> | null): void => {
    console.log("update")
    if (!notes) localStorage.removeItem('notes')
    else localStorage.setItem('notes', JSON.stringify(notes));
  }
};