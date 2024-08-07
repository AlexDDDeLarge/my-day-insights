import { ActionsType, NotesActionType, NoteType } from "../../types/types";

type StateType = {
  notes: Array<NoteType> | null;
  isInitialized: boolean;
  currentNote: NoteType | null;
  createMode: boolean;
  searchResult: NoteType[] | null;
};

const initialState: StateType = {
  notes: [
    // {
    //   id: 1,
    //   date: new Date(),
    //   isFavorite: true,
    //   mood: "bad",
    //   importantOccasion: "string",
    //   theDayGoodThings: "string",
    //   insights: "string",
    // },
    // {
    //   id: 2,
    //   date: new Date(),
    //   isFavorite: true,
    //   mood: "good",
    //   importantOccasion: "string",
    //   theDayGoodThings: "string",
    //   insights: "string",
    // },
  ],
  isInitialized: false,
  currentNote: null,
  createMode: false,
  searchResult: [],
};

export const notesReducer = (
  state = initialState,
  action: ActionsType<NotesActionType | { notes: null }>
) => {
  switch (action.type) {
    case "NOTES-INITIALIZE":
      return {
        ...state,
        isInitialized: true,
      };
    case "NOTES-SET-ALL-NOTES":
      return {
        ...state,
        notes: action.notes,
      };
    case "NOTES-CREATE-DAILY-NOTE":
      const currentDate: Date = new Date();
      const weekDay = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(currentDate);
      const dataValue = `
        ${currentDate.getDate()}.${
        currentDate.getMonth() < 10 && "0"
      }${currentDate.getMonth()}.${currentDate.getFullYear()} 
        ${weekDay} ${currentDate.getHours()}:${currentDate.getMinutes()}
      `;
      const noteId = `${currentDate.getSeconds()}${currentDate.getMinutes()}${currentDate.getHours()}${currentDate.getDate()}${currentDate.getMonth()}${currentDate.getFullYear()}`;
      return {
        ...state,
        notes: [
          {
            date: dataValue,
            chartDate: {
              day: weekDay,
              date: currentDate.getDate(),
              month: currentDate.getMonth(),
              year: currentDate.getFullYear(),
            },
            id: Number(noteId),
            ...action.data,
          },
          ...(state.notes as Array<NoteType>),
        ],
      };
    case "NOTES-GET-NOTE":
      const arrayWithNote: NoteType[] | undefined = state.notes?.filter(
        (note) => note.id === action.id
      );
      return {
        ...state,
        currentNote:
          arrayWithNote && arrayWithNote.length >= 1 ? arrayWithNote[0] : null,
        createMode: action.id === 0 ? true : false,
      };
    case "NOTES-EDIT-NOTE":
      return {
        ...state,
        notes:
          state.notes &&
          state.notes.map((note: NoteType): NoteType => {
            let changedNote = null;
            if (note.id === action.id) {
              changedNote = {
                ...note,
                ...action.payload,
              };
              return changedNote;
            } else return note;
          }),
      };
    case "NOTES-CHANGE-IS-FAVORITE":
      const changedNotes: NoteType[] | undefined = state.notes?.map(
        (note: NoteType): NoteType => {
          if (note.id === action.id) {
            note.isFavorite = action.isFavorite;
            return note;
          } else return note;
        }
      );
      return {
        ...state,
        notes: changedNotes as NoteType[],
      };
    case "NOTES-REMOVE-NOTE":
      return {
        ...state,
        notes: state.notes
          ? state.notes.filter((note: NoteType) => note.id !== action.id)
          : [],
        currentNote: null,
        createMode: false,
      };
    case "NOTES-SEARCH":
      return {
        ...state,
        searchResult: state.notes
          ? state.notes.filter((note) => {
              let condition;
              switch (action.where) {
                case "all":
                  condition =
                    note.importantOccasion.includes(action.text) ||
                    note.theDayGoodThings.includes(action.text) ||
                    note.insights.includes(action.text) ||
                    note.mood.includes(action.text);
                  break;
                case "mood":
                  condition = note.mood.includes(action.text);
                  break;
                case "importantOccasion":
                  condition = note.importantOccasion.includes(action.text);
                  break;
                case "theDayGoodThings":
                  condition = note.theDayGoodThings.includes(action.text);
                  break;
                case "insights":
                  condition = note.insights.includes(action.text);
                  break;
              }
              if (condition) return note;
            })
          : [],
      };
    default:
      return state;
  }
};
