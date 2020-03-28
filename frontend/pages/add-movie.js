import CreateMovie from "../components/CreateMovie";
import PleaseSignIn from "../components/PleaseSignIn";

const AddMoviePage = props => (
  <div>
    <PleaseSignIn>
      <CreateMovie />
    </PleaseSignIn>
  </div>
);

export default AddMoviePage;
