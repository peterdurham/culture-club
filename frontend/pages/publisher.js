import User from "../components/User";

import Books from "../components/Books";

const PublisherPage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "book") {
          return (
            <Books
              filter="publisher"
              publisher={props.query.publisher}
              page={parseFloat(props.query.page) || 1}
              cardView={props.cardView}
              setCardView={props.setCardView}
            />
          );
        }
      }}
    </User>
  );
};

export default PublisherPage;
