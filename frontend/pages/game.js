import SingleGame from "../components/SingleGame";

const Game = props => {
  return (
    <div>
      <SingleGame id={props.query.id} />
    </div>
  );
};

export default Game;
