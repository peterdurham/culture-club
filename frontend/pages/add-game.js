import CreateGame from "../components/CreateGame";
import PleaseSignIn from "../components/PleaseSignIn";

const AddGamePage = props => (
  <div>
    <PleaseSignIn>
      <CreateGame />
    </PleaseSignIn>
  </div>
);

export default AddGamePage;
