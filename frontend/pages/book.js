import SingleBook from "../components/SingleBook";

const Book = props => {
  return (
    <div>
      <SingleBook id={props.query.id} />
    </div>
  );
};

export default Book;
