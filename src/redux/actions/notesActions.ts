import { MoodType, NoteType, SearchWhereType } from "../../types/types";

export const notesActions = {
  initialize: () => ({
    type: "NOTES-INITIALIZE" as const,
  }),
  setAllNotes: (notes: Array<NoteType> | null) => ({
    type: "NOTES-SET-ALL-NOTES" as const,
    notes,
  }),
  createDailyNote: (
    isFavorite: boolean,
    mood: MoodType,
    importantOccasion: string,
    theDayGoodThings: string,
    insights: string
  ) => ({
    type: "NOTES-CREATE-DAILY-NOTE" as const,
    data: {
      isFavorite,
      mood,
      importantOccasion,
      theDayGoodThings,
      insights,
    },
  }),
  getNote: (id: number) => ({
    type: "NOTES-GET-NOTE" as const,
    id,
  }),
  editNote: (
    id: number,
    payload: {
      isFavorite: boolean;
      mood: MoodType;
      importantOccasion: string;
      theDayGoodThings: string;
      insights: string;
    }
  ) => ({
    type: "NOTES-EDIT-NOTE" as const,
    id,
    payload,
  }),
  changeIsFavorite: (id: number, isFavorite: boolean) => ({
    type: "NOTES-CHANGE-IS-FAVORITE" as const,
    id,
    isFavorite,
  }),
  removeNote: (id: number) => ({
    type: "NOTES-REMOVE-NOTE" as const,
    id,
  }),
  search: (text: string, where: SearchWhereType) => ({
    type: "NOTES-SEARCH" as const,
    text,
    where,
  }),
};