import Games from "../components/Games";

const PlayedItPage = props => {
  return (
    <div>
      <h1>Games Played</h1>
      <Games filter="playedIt" />
    </div>
  );
};

export default PlayedItPage;
