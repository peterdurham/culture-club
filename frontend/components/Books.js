import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Book from "./Book";
import Pagination from "./PaginationBooks";
import { perPage } from "../config";
import SearchBooks from "./SearchBooks";
import User from "./User";

const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    books(first: $first, skip: $skip, orderBy: title_DESC) {
      id
      title
      author
      year
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const BooksList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Books extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Center>
              <SearchBooks />
              <Pagination page={this.props.page} />
              <Query
                query={ALL_BOOKS_QUERY}
                // fetchPolicy="network-only"
                variables={{
                  skip: this.props.page * perPage - perPage,
                  first: perPage
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  return (
                    <BooksList>
                      {this.props.filter === "all" && (
                        <>
                          {data.books.map(book => (
                            <Book book={book} key={book.id} me={me} />
                          ))}
                        </>
                      )}
                      {this.props.filter === "toRead" && (
                        <>
                          {data.books
                            .filter(book => {
                              const toReadIds = me.toRead.map(
                                item => item.book.id
                              );

                              return toReadIds.indexOf(book.id) > -1;
                            })
                            .map(book => (
                              <Book book={book} key={book.id} me={me} />
                            ))}
                        </>
                      )}
                      {this.props.filter === "readIt" && (
                        <>
                          {data.books
                            .filter(book => {
                              const readItIds = me.readIt.map(
                                item => item.book.id
                              );

                              return readItIds.indexOf(book.id) > -1;
                            })
                            .map(book => (
                              <Book book={book} key={book.id} me={me} />
                            ))}
                        </>
                      )}
                    </BooksList>
                  );
                }}
              </Query>
              <Pagination page={this.props.page} />
            </Center>
          );
        }}
      </User>
    );
  }
}

export default Books;
export { ALL_BOOKS_QUERY };
