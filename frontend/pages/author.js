import User from "../components/User";

import Books from "../components/books/Books";

const AuthorPage = (props) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (props.query.type === "book") {
          return (
            <Books
              filter="author"
              author={props.query.author}
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

export default AuthorPage;
