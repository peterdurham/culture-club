import Movies from "../components/Movies";

const SeenItPage = props => {
  return (
    <div>
      <h1>Movies Seen</h1>
      <Movies filter="seenIt" />
    </div>
  );
};

export default SeenItPage;
