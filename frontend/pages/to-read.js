import Books from "../components/Books";

const ToReadPage = (props) => {
  return (
    <div>
      <h1>Books To Read</h1>
      <Books
        filter="toRead"
        cardView={props.cardView}
        setCardView={props.setCardView}
      />
    </div>
  );
};

export default ToReadPage;
