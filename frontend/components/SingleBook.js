import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import { Query } from "react-apollo";
import styled from "styled-components";

import Error from "./ErrorMessage";

const SingleBookStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  padding: 0 4rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($id: ID!) {
    book(where: { id: $id }) {
      id
      title
      author
      description
      largeImage
    }
  }
`;

class SingleBook extends Component {
  render() {
    console.log(this.props.id);
    return (
      <Query
        query={SINGLE_BOOK_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.book) return <p>No book Found for {this.props.id}</p>;
          const book = data.book;
          return (
            <SingleBookStyles>
              <Head>
                <title>Culture Club | {book.title}</title>
              </Head>
              <img src={book.largeImage} alt={book.title} />
              <div className="details">
                <h2>Viewing {book.title}</h2>
                <p>{book.description}</p>
              </div>
            </SingleBookStyles>
          );
        }}
      </Query>
    );
  }
}
export default SingleBook;
