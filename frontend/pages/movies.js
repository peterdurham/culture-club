import Movies from "../components/Movies";

const MoviesPage = props => {
  return (
    <div>
      <h1>Movies Page</h1>
      <Movies filter="all" />
    </div>
  );
};

export default MoviesPage;
