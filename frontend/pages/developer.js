import User from "../components/User";

import Games from "../components/Games";

const DeveloperPage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "game") {
          return (
            <Games
              filter="developer"
              developer={props.query.developer}
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

export default DeveloperPage;
