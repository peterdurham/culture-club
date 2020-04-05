import User from "../components/User";

import Movies from "../components/Movies";
import Books from "../components/Books";
import Games from "../components/Games";

import { MovieGenres, BookGenres, GameGenres } from "../config";

const GenrePage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "game") {
          const genres = [props.query.genre];
          const genreTitles = GameGenres.map((genre) => genre.title);
          const genreValues = GameGenres.map((genre) => genre.value);
          const genreLabels = genres.map((genre, index) => {
            const genreIndex = genreValues.indexOf(genre);
            return genreTitles[genreIndex];
          });
          return (
            <Games
              filter="genre"
              genre={props.query.genre}
              genreLabel={genreLabels[0]}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        } else if (props.query.type === "movie") {
          const genres = [props.query.genre];
          const genreTitles = MovieGenres.map((genre) => genre.title);
          const genreValues = MovieGenres.map((genre) => genre.value);
          const genreLabels = genres.map((genre, index) => {
            const genreIndex = genreValues.indexOf(genre);
            return genreTitles[genreIndex];
          });
          return (
            <Movies
              filter="genre"
              genre={props.query.genre}
              genreLabel={genreLabels[0]}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        } else if (props.query.type === "book") {
          const genres = [props.query.genre];
          const genreTitles = BookGenres.map((genre) => genre.title);
          const genreValues = BookGenres.map((genre) => genre.value);
          const genreLabels = genres.map((genre, index) => {
            const genreIndex = genreValues.indexOf(genre);
            return genreTitles[genreIndex];
          });
          return (
            <Books
              filter="genre"
              genre={props.query.genre}
              genreLabel={genreLabels[0]}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        }
      }}
    </User>
  );
};

export default GenrePage;
