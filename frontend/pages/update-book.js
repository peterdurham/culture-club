import UpdateBook from "../components/books/UpdateBook";

const UpdateBookPage = ({ query }) => (
  <div>
    <UpdateBook id={query.id} />
  </div>
);

export default UpdateBookPage;
