import CreateGame from "../components/games/CreateGame";
import PleaseSignIn from "../components/PleaseSignIn";

const AddGamePage = (props) => (
  <div>
    <PleaseSignIn>
      <CreateGame />
    </PleaseSignIn>
  </div>
);

export default AddGamePage;
