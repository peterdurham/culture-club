import User from "../components/User";

import Games from "../components/games/Games";
import { GameNumPlayers } from "../config.js";

const PlayersPage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        const numPlayers = [props.query.players];
        const numPlayersTitles = GameNumPlayers.map(
          (numPlayers) => numPlayers.title
        );
        const numPlayersValues = GameNumPlayers.map(
          (numPlayers) => numPlayers.value
        );

        const numPlayersLabels = numPlayers.map((numPlayers, index) => {
          const numPlayersIndex = numPlayersValues.indexOf(numPlayers);
          return numPlayersTitles[numPlayersIndex];
        });

        if (props.query.type === "game") {
          return (
            <Games
              filter="players"
              players={props.query.players}
              playersLabel={numPlayersLabels[0]}
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

export default PlayersPage;
