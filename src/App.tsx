import React, { useEffect, useState } from "react";
import s from "./AppCSS/App.module.css";
import logo from "./assets/diary.png";
import "./AppCSS/root.css";
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

import c from "classnames";
import NavItem from "./components/NavItem/NavItem";
import {
  getFavoriteNotesSuperSelector,
  getIsInitializedSelector,
  getNotesSelector,
} from "./redux/selectors/notesSelectors";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import { NoteType } from "./types/types";
import { notesActions } from "./redux/actions/notesActions";
import { initializeApp } from "./redux/middleware/notesThunks";
import Note from "./components/Note/Note";
import Svgs from "./components/Svgs/Svgs";
import Header from "./components/Header/Header";
import Chart from "./components/Chart/Chart";
import MainPage from "./components/MainPage/MainPage";

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

  const [isSidebarShown, setIsSidebarShown] = useState(false);

  const setShowingSidebar = (e?: any) => {
    setIsSidebarShown(isSidebarShown ? false : true);
  };

  const navItems =
    notes &&
    notes.map((item) => {
      return (
        <NavItem
          key={item.id}
          item={item}
          getNote={getNote}
          setOnClick={setShowingSidebar}
        />
      );
    });

  const favoriteNavItems =
    favoriteNotes &&
    favoriteNotes.map((item) => (
      <NavItem
        key={item.id}
        item={item}
        getNote={getNote}
        setOnClick={setShowingSidebar}
      />
    ));

  const [isFavoriteShown, setIsFavoriteShown] = useState(false);

  const location = useLocation();

  return (
    <div className={s.body}>
      <Svgs />
      <Header
        setIsSidebarShown={setIsSidebarShown}
        setIsFavoriteShown={setIsFavoriteShown}
        isFavoriteShown={isFavoriteShown}
        isSidebarShown={isSidebarShown}
        setShowingSidebar={setShowingSidebar}
        location={location}
      />
      <nav className={c(s.sidebar, { [s.sidebarIsShown]: isSidebarShown })}>
        <div className="fiterBlock"></div>
        <ul>{isFavoriteShown ? favoriteNavItems : navItems}</ul>
      </nav>
      <main className={c(s.main, { [s.mainIsNotShown]: isSidebarShown })}>
        {location.pathname === "/" ? 
        // (
        //   <div className={s.createBlock}>
        //     <p className="appDiscription">
        //       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
        //       deleniti pariatur rerum fugit assumenda eligendi
        //     </p>
        //     <Link to={"notes/createNewNote"} onClick={() => getNote(0)}>
        //       <button className="addNewDailyNote">create new one</button>
        //     </Link>
        //     <Chart/>
        //   </div>
        // )
        <MainPage getNote={getNote}/>
         : null}
        <Outlet />
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
        {
          path: "notes/search",
          element: <SearchBlock />,
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
