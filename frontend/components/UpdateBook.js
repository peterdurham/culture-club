import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($id: ID!) {
    book(where: { id: $id }) {
      id
      title
      author
      description
      year
    }
  }
`;
const UPDATE_BOOK_MUTATION = gql`
  mutation UPDATE_BOOK_MUTATION(
    $id: ID!
    $title: String
    $author: String
    $description: String
    $year: Int
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      description: $description
      year: $year
    ) {
      id
      title
      author
      description
      year
    }
  }
`;

class UpdateBook extends Component {
  state = {};
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  updateBook = async (e, updateBookMutation) => {
    e.preventDefault();
    console.log("Updating Book!!");
    console.log(this.state);
    const res = await updateBookMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log("Updated!!");
  };

  render() {
    return (
      <Query
        query={SINGLE_BOOK_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.book) return <p>No Book Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_BOOK_MUTATION} variables={this.state}>
              {(updateBook, { loading, error }) => (
                <Form onSubmit={e => this.updateBook(e, updateBook)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.book.title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="author">
                      Author
                      <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        required
                        defaultValue={data.book.author}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="year">
                      Year
                      <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Year"
                        required
                        defaultValue={data.book.year}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        defaultValue={data.book.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateBook;
export { UPDATE_BOOK_MUTATION };
