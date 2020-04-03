import Books from "../components/Books";

const BooksPage = props => {
  return (
    <div>
      <h1>Books Page</h1>
      <Books filter="all" />
    </div>
  );
};

export default BooksPage;
