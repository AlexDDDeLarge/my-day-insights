import React, { useEffect, useState } from "react";
import s from "./App.module.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import ErrorPage from "./components/errorPage/errorPage";
import { store, AppStateType } from "./redux/store";
import { connect, Provider } from "react-redux";
import Note from "./components/errorPage/Note/Note";
import {
  initializeApp,
  notesActions,
  NoteType,
} from "./redux/notes/notesReducer";
import c from "classnames";
import NavItem from "./components/errorPage/NavItem/NavItem";
import { getFavoriteNotesSuperSelector, getIsInitializedSelector, getNotesSelector } from "./redux/notes/notesSelectors";

type MSTPropsType = {
  notes: Array<NoteType> | null;
  isInitialized: boolean;
  favoriteNotes: Array<NoteType>;
};

type MDTPropsType = {
  initializeApp(): void;
  getNote(id: number): void;
};

type OwnPropsType = {};

type PropsType = MSTPropsType & MDTPropsType & OwnPropsType;

const Root: React.FC<PropsType> = ({
  notes,
  isInitialized,
  favoriteNotes,
  getNote,
  initializeApp,
}) => {
  useEffect(() => {
    initializeApp();
  }, [isInitialized]);

  const navItems =
    notes &&
    notes.map((item) => {
      return <NavItem key={item.id} item={item} getNote={getNote}/>;
    });

  const favoriteNavItems = 
    favoriteNotes &&
    favoriteNotes.map((item) => (
      <NavItem key={item.id} item={item} getNote={getNote}/>
    ));

  const [isFovoriteShown, setIsFovoriteShown] = useState(false);

  return (
    <div className={s.body}>
      <header className={s.header}>
        <div className="logo"></div>
        <button className={c(s.headerButton, s.headerButtonSearch)}>
          search
        </button>
        <button 
          className={s.headerButton}
          onClick={() => setIsFovoriteShown(
            isFovoriteShown ? false : true
          )}
        >{isFovoriteShown ? "all" : "favorite"}</button>
      </header>
      <nav className={s.sidebar}>
        <div className="fiterBlock"></div>
        <ul>
          {isFovoriteShown ? favoriteNavItems : navItems}
        </ul>
      </nav>
      <main className={s.main}>
        <p className="appDiscription">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          deleniti pariatur rerum fugit assumenda eligendi
        </p>
        <Link to={"notes/createNewNote"} onClick={() => getNote(0)}>
          <button className="addNewDailyNote">create new one</button>
        </Link>

        <div className="notes">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MSTPropsType => ({
  notes: getNotesSelector(state),
  isInitialized: getIsInitializedSelector(state),
  favoriteNotes: getFavoriteNotesSuperSelector(state) as NoteType[],
});

const ConnectedRoot = connect(mapStateToProps, {
  initializeApp,
  getNote: notesActions.getNote,
})(Root);

const App: React.FC<PropsType> = (props) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ConnectedRoot />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "notes/:noteId",
          element: <Note />,
        },
        {
          path: "notes/createNewNote",
          element: <Note />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

export default App;
