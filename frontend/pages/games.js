import Games from "../components/Games";

const GamesPage = props => {
  return (
    <div>
      <h1>Games Page</h1>
      <Games filter="all" />
    </div>
  );
};

export default GamesPage;
