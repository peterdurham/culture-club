import SingleMovie from "../components/SingleMovie";

const Movie = props => {
  return (
    <div>
      <SingleMovie id={props.query.id} />
    </div>
  );
};

export default Movie;
