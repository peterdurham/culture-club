import UpdateMovie from "../components/movies/UpdateMovie";

const UpdateMoviePage = ({ query }) => (
  <div>
    <UpdateMovie id={query.id} />
  </div>
);

export default UpdateMoviePage;
