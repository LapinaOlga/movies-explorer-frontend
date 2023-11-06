import React from "react";

export const MoviesContext = React.createContext({
  allMovies: null,
  setAllMovies: () => {}
});
