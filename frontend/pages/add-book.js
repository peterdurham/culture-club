import CreateBook from "../components/CreateBook";
import PleaseSignIn from "../components/PleaseSignIn";

const AddBookPage = props => (
  <div>
    <PleaseSignIn>
      <CreateBook />
    </PleaseSignIn>
  </div>
);

export default AddBookPage;
