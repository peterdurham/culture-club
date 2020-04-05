import User from "../components/User";

import Movies from "../components/Movies";

const DirectorPage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "movie") {
          return (
            <Movies
              filter="director"
              director={props.query.director}
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

export default DirectorPage;
