import React, { useEffect, useState } from "react";
import s from "./Note.module.css";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  MoodType,
  NoteType,
  BasicNoteType,
  changeNote,
  addNewNote,
  removeNote,
  changeIsFavorite,
} from "../../../redux/notes/notesReducer";
import {
  getCreateModeSelector,
  getCurrentNoteSelector,
  getNotesSelector,
} from "../../../redux/notes/notesSelectors";
import { AppStateType } from "../../../redux/store";
import TextField from "./TextField/TextField";

type MSTPType = {
  note: NoteType | null;
  notes: NoteType[] | null;
  createMode: boolean;
};

type MDTPType = {
  addNewNote(
    isFavorite: boolean,
    mood: MoodType,
    importantOccasion: string,
    theDayGoodThings: string,
    insights: string
  ): void;
  changeNote(id: number, payload: BasicNoteType): void;
  changeIsFavorite(id: number, isFavorite: boolean): void;
  removeNote(id: number): void;
};

type OwnPropsType = {};

type PropsType = MSTPType & MDTPType & OwnPropsType;

const Note: React.FC<PropsType> = ({
  note,
  addNewNote,
  notes,
  changeNote,
  createMode,
  changeIsFavorite,
  removeNote,
}) => {
  const {
    id,
    date,
    isFavorite,
    mood,
    insights,
    importantOccasion,
    theDayGoodThings,
  } = note || {};

  const defaultValuesOfForm = {
    isFavorite: isFavorite || false,
    mood: mood || "calm",
    importantOccasion: importantOccasion || "",
    theDayGoodThings: theDayGoodThings || "",
    insights: insights || "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    values: defaultValuesOfForm,
  });

  watch("mood");
  watch("importantOccasion");
  watch("theDayGoodThings");
  watch("insights");

  const onSubmit = (data: BasicNoteType) => {
    const { isFavorite, mood, importantOccasion, theDayGoodThings, insights } =
      data;
    addNewNote(isFavorite, mood, importantOccasion, theDayGoodThings, insights);
  };

  useEffect(() => {
    reset();
    setEditMode(false);
  }, [notes]);

  const [editMode, setEditMode] = useState(false);

  const editModeOnClick = (e: any): void => {
    e.preventDefault();
    setEditMode(editMode ? false : true);
  };

  const removeNoteOnClick = (e: any): void => {
    e.preventDefault();
    removeNote(id as number);
  };

  const saveChangesOnCLick = (e: any): void => {
    e.preventDefault();
    setEditMode(editMode ? false : true);
    changeNote(id as number, getValues());
  };

  if (note || createMode)
    return (
      <div className={s.note}>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <header className="noteHead">
            <p className="date">{date ? date : "New note"}</p>
            {!editMode && (
              <input
                {...register("isFavorite")}
                className="isFavorite"
                type="checkbox"
                checked={isFavorite}
                onChange={() => {
                  debugger
                  note &&
                    // changeIsFavorite(id as number, isFavorite ? false : true);
                    changeIsFavorite(id as number, isFavorite ? false : true);

                }}
              />
            )}
            <button className="closeNote" onClick={(e) => e.preventDefault()}>close note</button>
            {note && (
              <button className="editNote" onClick={editModeOnClick}>
                edit note
              </button>
            )}
            {note && (
              <button className="editNote" onClick={removeNoteOnClick}>
                remove note
              </button>
            )}
          </header>

          <h2 className="moodQuestion">What is your mood?</h2>
          <select
            {...register("mood", { required: "This is required." })}
            disabled={!!note && !editMode}
          >
            <option value={"awful"}>awful</option>
            <option value={"bad"}>bad</option>
            <option value={"calm"}>calm</option>
            <option value={"good"}>good</option>
            <option value={"happy"}>happy</option>
          </select>
          <TextField
            question={"What important thing happened today?"}
            fieldValue={importantOccasion as string}
            register={register}
            name={"importantOccasion"}
            errors={errors}
            editMode={editMode}
          />
          <TextField
            question={"What good thing happened today?"}
            fieldValue={theDayGoodThings as string}
            register={register}
            name={"theDayGoodThings"}
            errors={errors}
            editMode={editMode}
          />
          <TextField
            question={"What insights do you have today?"}
            fieldValue={insights as string}
            register={register}
            name={"insights"}
            errors={errors}
            editMode={editMode}
          />
          {!note && <input type="submit" value={"save"} />}
          {note && editMode && (
            <button onClick={saveChangesOnCLick}>save changes</button>
          )}
        </form>
      </div>
    );
  else return null;
};

const mapStateToProps = (state: AppStateType): MSTPType => ({
  note: getCurrentNoteSelector(state),
  notes: getNotesSelector(state),
  createMode: getCreateModeSelector(state),
});

export default connect(mapStateToProps, {
  removeNote,
  addNewNote,
  changeNote,
  changeIsFavorite,
})(Note);
