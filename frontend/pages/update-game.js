import UpdateGame from "../components/games/UpdateGame";

const UpdateGamePage = ({ query }) => (
  <div>
    <UpdateGame id={query.id} />
  </div>
);

export default UpdateGamePage;
