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
      genre1
      genre2
      genre3
      printLength
      publisher
      pdfURL
      image
      largeImage
      user {
        id
      }
    }
  }
`;

const BooksList = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 40px; */

  display: flex;
  flex-wrap: wrap;
  max-width: ${(props) => props.theme.maxWidth};
`;

const Books = (props) => {
  const filters = ["all", "toRead", "readIt", "genre", "year"];
  // const view = ["default", "wide", "list"];

  // const view = "wide";
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <div>
            {props.genre && (
              <h1 className="page-header">{props.genreLabel} Books</h1>
            )}
            {props.year && (
              <h1 className="page-header">Books from {props.year}</h1>
            )}
            {props.author && (
              <h1 className="page-header">Books by {props.author}</h1>
            )}
            {props.publisher && (
              <h1 className="page-header">
                Books published by {props.publisher}
              </h1>
            )}
            <SearchBooks />
            <div className="cardStyleButtons">
              <button
                className="button"
                onClick={() => props.setCardView("default")}
              >
                Default View
              </button>
              <button
                className="button"
                onClick={() => props.setCardView("wide")}
              >
                Wide View
              </button>
            </div>
            <Pagination page={props.page} />
            <Query
              query={ALL_BOOKS_QUERY}
              // fetchPolicy="network-only"
              variables={{
                skip: props.page * perPage - perPage,
                first: perPage,
              }}
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return (
                  <BooksList>
                    {props.filter === "all" && (
                      <>
                        {data.books.map((book) => (
                          <Book
                            book={book}
                            key={book.id}
                            me={me}
                            cardView={props.cardView}
                          />
                        ))}
                      </>
                    )}
                    {props.filter === "toRead" && (
                      <>
                        {data.books
                          .filter((book) => {
                            const toReadIds = me.toRead.map(
                              (item) => item.book.id
                            );

                            return toReadIds.indexOf(book.id) > -1;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "readIt" && (
                      <>
                        {data.books
                          .filter((book) => {
                            const readItIds = me.readIt.map(
                              (item) => item.book.id
                            );

                            return readItIds.indexOf(book.id) > -1;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "genre" && (
                      <>
                        {data.books
                          .filter((book) => {
                            const first = book.genre1 === props.genre;
                            const second = book.genre2 === props.genre;
                            const third = book.genre3 === props.genre;
                            return first || second || third;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "year" && (
                      <>
                        {data.books
                          .filter((book) => {
                            return book.year === Number(props.year);
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "author" && (
                      <>
                        {data.books
                          .filter((book) => {
                            return book.author === props.author;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "publisher" && (
                      <>
                        {data.books
                          .filter((book) => {
                            return book.publisher === props.publisher;
                          })
                          .map((book) => (
                            <Book
                              book={book}
                              key={book.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                  </BooksList>
                );
              }}
            </Query>
            <Pagination page={props.page} />
          </div>
        );
      }}
    </User>
  );
};

export default Books;
export { ALL_BOOKS_QUERY };
