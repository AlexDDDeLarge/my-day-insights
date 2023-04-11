import { NoteType } from '../reducers/notesReducer';
import { createSelector } from "reselect";
import { AppStateType } from "../store";

export const getNotesSelector = (state: AppStateType) => (
  state.notesReducer.notes
);

export const getIsInitializedSelector = (state: AppStateType) => (
  state.notesReducer.isInitialized
);

export const getCurrentNoteSelector = (state: AppStateType) => (
  state.notesReducer.currentNote
);

export const getCreateModeSelector = (state: AppStateType) => (
  state.notesReducer.createMode
);

export const getSearchResultSeleector = (state: AppStateType) => (
  state.notesReducer.searchResult
);

export const getFavoriteNotesSuperSelector = createSelector(getNotesSelector, (notes) => {
  return notes?.filter((note: NoteType) => note.isFavorite === true)
});