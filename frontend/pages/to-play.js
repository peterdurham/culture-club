import Games from "../components/games/Games";

const ToPlayPage = (props) => {
  return (
    <div>
      <h1>Games To Play</h1>
      <Games
        filter="toPlay"
        cardView={props.cardView}
        setCardView={props.setCardView}
      />
    </div>
  );
};

export default ToPlayPage;
