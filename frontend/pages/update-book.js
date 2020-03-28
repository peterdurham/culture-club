import UpdateBook from "../components/UpdateBook";

const UpdateBookPage = ({ query }) => (
  <div>
    <UpdateBook id={query.id} />
  </div>
);

export default UpdateBookPage;
