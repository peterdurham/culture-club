import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_BOOKS_QUERY } from "./Books";

const DELETE_BOOK_MUTATION = gql`
  mutation DELETE_BOOK_MUTATION($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

class DeleteBook extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the books we want
    const data = cache.readQuery({ query: ALL_BOOKS_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted book out of the page
    data.books = data.books.filter(
      (book) => book.id !== payload.data.deleteBook.id
    );
    // 3. Put the books back!
    cache.writeQuery({ query: ALL_BOOKS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_BOOK_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteBook, { error }) => (
          <button
            className="button"
            onClick={() => {
              if (confirm("Are you sure you want to delete this book?")) {
                deleteBook().catch((err) => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteBook;
