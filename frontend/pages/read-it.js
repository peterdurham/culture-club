import Books from "../components/Books";

const ReadItPage = (props) => {
  return (
    <div>
      <h1>Books Read</h1>
      <Books
        filter="readIt"
        cardView={props.cardView}
        setCardView={props.setCardView}
      />
    </div>
  );
};

export default ReadItPage;
