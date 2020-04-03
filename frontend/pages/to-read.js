import Books from "../components/Books";

const ToReadPage = props => {
  return (
    <div>
      <h1>Books To Read</h1>
      <Books filter="toRead" />
    </div>
  );
};

export default ToReadPage;
