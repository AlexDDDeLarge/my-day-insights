import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  notesActions,
  NoteType,
  SearchWhereType,
} from "../../../redux/reducers/notesReducer";
import { getSearchResultSeleector } from "../../../redux/selectors/notesSelectors";
import { AppStateType } from "../../../redux/store";
import NavItem from "../NavItem/NavItem";

type MSTPType = {
  searchResult: NoteType[] | null;
};

type MDTPType = {
  search(text: string, where: SearchWhereType): void;
  getNote(id: number): void;
};

type OwnPropsType = {};

type PropsType = MSTPType & MDTPType & OwnPropsType;

const SearchBlock: React.FC<PropsType> = ({
  search,
  searchResult,
  getNote,
}) => {
  const navItems =
    searchResult &&
    searchResult.map((item) => {
      return <NavItem key={item.id} item={item} getNote={getNote} />;
    });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    values: { text: "", where: "all" as SearchWhereType },
  });

  watch("text");
  watch("where");

  const onSubmit = (data: { text: string; where: SearchWhereType }) => {
    search(data.text, data.where);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <input
            {...register("text", { required: "This is required." })}
            className="isFavorite"
            type="text"
          />
          <select
            {...register("where", { required: "This is required." })}
            // disabled={!!note && !editMode}
          >
            <option value={"all"}>all</option>
            <option value={"mood"}>mood</option>
            <option value={"importantOccasion"}>importantOccasion</option>
            <option value={"theDayGoodThings"}>theDayGoodThings</option>
            <option value={"insights"}>insights</option>
          </select>
          <button>search</button>
        </form>
      </div>
      <nav>
        <ul>
          {navItems}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MSTPType => ({
  searchResult: getSearchResultSeleector(state),
});

export default connect(mapStateToProps, {
  search: notesActions.search,
  getNote: notesActions.getNote,
})(SearchBlock);
// export default SearchBlock;
