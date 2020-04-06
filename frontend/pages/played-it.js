import Games from "../components/games/Games";

const PlayedItPage = (props) => {
  return (
    <div>
      <h1>Games Played</h1>
      <Games
        filter="playedIt"
        cardView={props.cardView}
        setCardView={props.setCardView}
      />
    </div>
  );
};

export default PlayedItPage;
