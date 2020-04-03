import Books from "../components/Books";

const ReadItPage = props => {
  return (
    <div>
      <h1>Books Read</h1>
      <Books filter="readIt" />
    </div>
  );
};

export default ReadItPage;
