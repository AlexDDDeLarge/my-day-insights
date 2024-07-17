import { notesActions } from "../actions/notesActions";
import {  notesReducer } from "../reducers/notesReducer";

const currentDate = new Date;

const initialState: any = {
  notes: [
    {
      id: 46346,
      date: currentDate,
      isFavorite: false,
      mood: "good",
      importantOccasion: "the talk",
      theDayGoodThings: "having a good walk",
      insights: "I have selfvaluence"
    }
  ],
  searchResult: [],
};

test("should notes length qual to 2", () => {
  expect(notesReducer(initialState, { type: "NOTES-CREATE-DAILY-NOTE", data: {
    isFavorite: false,
    mood: "good",
    importantOccasion: "DSgsgsg",
    theDayGoodThings: "Sdgsdgsgd",
    insights: "Dsgsdg"
  }}).notes).toHaveLength(2)
})

test("notes should be null", () => {
  expect(notesReducer(initialState, { type: "NOTES-SET-ALL-NOTES", notes: null}).notes).toBe(null);
})

test("should searchResult length qual to 1", () => {
  expect(notesReducer(initialState, notesActions.search("good", "mood")).searchResult).toHaveLength(1)
})


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ActionsType, MoodType, NotesActionType, notesReducer, NoteType } from './notesReducer';

// export type AddNewNoteType = {
//     date?: Date,
//     id?: number,
//     isFavorite: boolean,
//     mood: MoodType,
//     importantOccasion: string,
//     theDayGoodThings: string,
//     insights: string
// };

// type initialStateType = {
//   notes: Array<AddNewNoteType> | null
// }

// const currentDate = new Date;

// const initialState: initialStateType = {
//   notes: [
//     {
//       id: 46346,
//       date: currentDate,
//       isFavorite: false,
//       mood: "good",
//       importantOccasion: "the talk",
//       theDayGoodThings: "having a good walk",
//       insights: "I have selfvaluence"
//     }
//   ]
// };

// const notesSlice = createSlice({
//   name: "notes",
//   initialState,
//   reducers: {
//     addNewNote(state, action) {
//       switch (action.type) {
//         case "NOTES-SET-ALL-NOTES":
//           return {
//             ...state,
//             notes: action.notes
//           }
//         case "NOTES-CREATE-DAILY-NOTE":
//           const currentDate: Date = new Date();
//           return {
//             ...state,
//             notes: [
//               {
//                 date: currentDate,
//                 id: (currentDate.getSeconds() 
//                   + currentDate.getMinutes() 
//                   + currentDate.getHours() 
//                   + currentDate.getDate() 
//                   + currentDate.getMonth() 
//                   + currentDate.getFullYear()),
//                 ...action.payload
//               },
//               ...state.notes as Array<NoteType>
//             ]
//           }
//         default:
//           return state
//       }
//     }
//   }
// });

// const { addNewNote } = notesSlice.actions;

// const reducer = notesSlice.reducer;

// test("should notes length qual to 1", () => {
//   expect(reducer(initialState, { type: "NOTES-CREATE-DAILY-NOTE", payload: {
//     isFavorite: false,
//     mood: "good",
//     importantOccasion: "DSgsgsg",
//     theDayGoodThings: "Sdgsdgsgd",
//     insights: "Dsgsdg"
//   }}).notes).toHaveLength(1)
// })

// // test("", () => {
// //   expect(reducer(undefined, { type: "NOTES-SET-ALL-NOTES", notes: null}).notes).toBe(null);
// // })