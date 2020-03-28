import UpdateMovie from "../components/UpdateMovie";

const UpdateMoviePage = ({ query }) => (
  <div>
    <UpdateMovie id={query.id} />
  </div>
);

export default UpdateMoviePage;
