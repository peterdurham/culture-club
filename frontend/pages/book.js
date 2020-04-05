import SingleBook from "../components/SingleBook";
import User from "../components/User";

const Book = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        return <SingleBook id={props.query.id} me={me} />;
      }}
    </User>
  );
};

export default Book;
