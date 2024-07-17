import { apiLocalStorage } from "../../api/api";
import { BasicNoteType, MoodType, NoteType } from "../../types/types";
import { notesActions } from "../actions/notesActions";

const updateNotes = () => (dispatch: any, getState: any) => {
  apiLocalStorage.updateNotes(getState().notesReducer.notes);
  const notes: Array<NoteType> | null = apiLocalStorage.getAllNotes();
  dispatch(notesActions.setAllNotes(notes));
};

export const initializeApp = () => (dispatch: any) => {
  const notes: Array<NoteType> | null = apiLocalStorage.getAllNotes();
  dispatch(notesActions.setAllNotes(notes));
  dispatch(notesActions.initialize());
};

export const addNewNote =
  (
    isFavorite: boolean,
    mood: MoodType,
    importantOccasion: string,
    theDayGoodThings: string,
    insights: string
  ) =>
  (dispatch: any, getState: any) => {
    dispatch(
      notesActions.createDailyNote(
        isFavorite,
        mood,
        importantOccasion,
        theDayGoodThings,
        insights
      )
    );
    dispatch(updateNotes());
  };

export const changeNote =
  (id: number, payload: BasicNoteType) => (dispatch: any) => {
    dispatch(notesActions.editNote(id, payload));
    dispatch(notesActions.getNote(id));
  };

export const removeNote = (id: number) => (dispatch: any, getState: any) => {
  dispatch(notesActions.removeNote(id));
  dispatch(updateNotes());
};

export const changeIsFavorite =
  (id: number, isFavorite: boolean) => (dispatch: any, getState: any) => {
    dispatch(notesActions.changeIsFavorite(id, isFavorite));
    dispatch(updateNotes());
    dispatch(notesActions.getNote(id));
  };