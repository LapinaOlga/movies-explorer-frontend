import './Movies.scss'
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function Movies() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm/>
        <MovieCardList/>
      </main>
      <Footer/>
    </>
  );
}
