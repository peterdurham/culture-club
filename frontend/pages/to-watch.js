import Movies from "../components/Movies";

const ToWatchPage = (props) => {
  return (
    <div>
      <h1>Movies To Watch</h1>
      <Movies
        filter="toWatch"
        cardView={props.cardView}
        setCardView={props.setCardView}
      />
    </div>
  );
};

export default ToWatchPage;
