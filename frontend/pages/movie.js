import SingleMovie from "../components/movies/SingleMovie";
import User from "../components/User";

const Movie = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        return <SingleMovie id={props.query.id} me={me} />;
      }}
    </User>
  );
};

export default Movie;
