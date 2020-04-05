import User from "../components/User";

import Movies from "../components/Movies";
import Books from "../components/Books";
import Games from "../components/Games";

const YearPage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "game") {
          return (
            <Games
              filter="year"
              year={props.query.year}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        } else if (props.query.type === "movie") {
          return (
            <Movies
              filter="year"
              year={props.query.year}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        } else if (props.query.type === "book") {
          return (
            <Books
              filter="year"
              year={props.query.year}
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

export default YearPage;
