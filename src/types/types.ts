import { notesActions } from "../redux/actions/notesActions";

export type MoodType = "awful" | "bad" | "calm" | "good" | "happy";

export type BasicNoteType = {
  isFavorite: boolean;
  mood: MoodType;
  importantOccasion: string;
  theDayGoodThings: string;
  insights: string;
};

export type ChartDateType = {
  day: string;
  date: number;
  month: number;
  year: number;
};

export type NoteType = {
  id: number;
  date: string;
  chartDate: ChartDateType;
} & BasicNoteType;

export type SearchWhereType =
  | "all"
  | "mood"
  | "importantOccasion"
  | "theDayGoodThings"
  | "insights";

  export type NotesActionType = typeof notesActions;

  export type ActionsType<T> = T extends { [key: string]: infer U }
    ? ReturnType<U extends (...args: any) => any ? U : never>
    : never;