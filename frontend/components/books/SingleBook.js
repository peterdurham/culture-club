import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { Query } from "react-apollo";
import styled from "styled-components";
import AddToToRead from "./AddToToRead";
import RemoveFromToRead from "./RemoveFromToRead";
import AddToReadIt from "./AddToReadIt";
import RemoveFromReadIt from "./RemoveFromReadIt";
import DeleteBook from "./DeleteBook";
import Error from "../ErrorMessage";
import { TiEdit } from "react-icons/ti";
import { BookGenres } from "../../config";
import DetailsPageStyles from "../styles/DetailsPage";
import SimilarBooks from "./SimilarBooks";

import User from "../User";

const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY($skip: Int = 0) {
    books(skip: $skip, orderBy: title_DESC) {
      id
      title
      author
      year
      description
      printLength
      publisher
      pdfURL
      genre1
      genre2
      genre3
      image
      largeImage
      user {
        id
      }
    }
  }
`;

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($id: ID!) {
    book(where: { id: $id }) {
      id
      title
      author
      year
      description
      printLength
      publisher
      pdfURL
      genre1
      genre2
      genre3
      largeImage
      user {
        id
      }
    }
  }
`;

class SingleBook extends Component {
  render() {
    const { me } = this.props;
    let toReadIds;
    let readItIds;
    if (me) {
      toReadIds = this.props.me.toRead.map((item) => item.book.id);
      readItIds = this.props.me.readIt.map((item) => item.book.id);
    }

    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Query query={ALL_BOOKS_QUERY}>
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                if (!data.books)
                  return <p>No book Found for {this.props.id}</p>;
                const book = data.books.filter(
                  (book) => book.id === this.props.id
                )[0];

                const genres = [book.genre1, book.genre2, book.genre3];
                const genreTitles = BookGenres.map((genre) => genre.title);
                const genreValues = BookGenres.map((genre) => genre.value);

                const genreLabels = genres.map((genre, index) => {
                  const genreIndex = genreValues.indexOf(genre);
                  return genreTitles[genreIndex];
                });
                return (
                  <>
                    <DetailsPageStyles>
                      <Head>
                        <title>Culture Club | {book.title}</title>
                      </Head>
                      <div className="singleImageContainer">
                        <img
                          src={book.largeImage}
                          alt={book.title}
                          className="singleImage"
                        />
                        {me && (
                          <div className="singleButtons">
                            {toReadIds.indexOf(book.id) > -1 ? (
                              <RemoveFromToRead id={book.id} />
                            ) : (
                              <AddToToRead id={book.id} />
                            )}

                            {readItIds.indexOf(book.id) > -1 ? (
                              <RemoveFromReadIt id={book.id} />
                            ) : (
                              <AddToReadIt id={book.id} />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="singleDetails">
                        <div>
                          <h2 className="singleTitle">{book.title} </h2>

                          <div className="singleYear">
                            <Link
                              href={{
                                pathname: "/year",
                                query: {
                                  type: "book",
                                  year: book.year,
                                },
                              }}
                            >
                              <a>({book.year})</a>
                            </Link>
                          </div>
                          {me && me.id === book.user.id && (
                            <div className="singleActions">
                              <Link
                                href={{
                                  pathname: "update-book",
                                  query: { id: book.id },
                                }}
                              >
                                <a className="button singleEdit">Edit</a>
                              </Link>

                              {/* <DeleteBook id={book.id}>Delete</DeleteBook> */}
                            </div>
                          )}
                        </div>

                        {book.author && (
                          <div>
                            <Link
                              href={{
                                pathname: "/author",
                                query: {
                                  type: "book",
                                  author: book.author,
                                },
                              }}
                            >
                              <a>
                                <span className="bold">Author: </span>{" "}
                                {book.author}
                              </a>
                            </Link>
                          </div>
                        )}
                        <div className="singleGenres">
                          <span className="bold">Genres: </span>

                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "book",
                                genre: book.genre1,
                              },
                            }}
                          >
                            <a>
                              <span>{genreLabels[0]}</span>
                            </a>
                          </Link>
                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "book",
                                genre: book.genre2,
                              },
                            }}
                          >
                            <a>
                              {book.genre2 !== "UNSELECTED" && (
                                <span>, {genreLabels[1]}</span>
                              )}
                            </a>
                          </Link>

                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "book",
                                genre: book.genre3,
                              },
                            }}
                          >
                            <a>
                              {book.genre3 !== "UNSELECTED" && (
                                <span>, {genreLabels[2]}</span>
                              )}
                            </a>
                          </Link>
                        </div>
                        {book.printLength && (
                          <div>
                            <span className="bold">printLength: </span>{" "}
                            {book.printLength} pages
                          </div>
                        )}
                        {book.publisher && (
                          <div>
                            <Link
                              href={{
                                pathname: "/publisher",
                                query: {
                                  type: "book",
                                  publisher: book.publisher,
                                },
                              }}
                            >
                              <a>
                                <span className="bold">publisher: </span>{" "}
                                {book.publisher}
                              </a>
                            </Link>
                          </div>
                        )}
                        {book.pdfURL && (
                          <div>
                            <span className="bold">pdfURL: </span> {book.pdfURL}
                          </div>
                        )}
                        <div className="singleDescription">
                          <span className="bold">Description: </span>
                          {book.description}
                        </div>
                      </div>
                    </DetailsPageStyles>
                    <>
                      <SimilarBooks
                        me={me}
                        id={book.id}
                        books={data.books}
                        genre={book.genre1}
                        genreLabel={genreLabels[0]}
                        cardView={this.props.cardView}
                      />
                      {book.genre2 !== "UNSELECTED" && (
                        <SimilarBooks
                          me={me}
                          id={book.id}
                          books={data.books}
                          genre={book.genre2}
                          genreLabel={genreLabels[1]}
                          cardView={this.props.cardView}
                        />
                      )}
                      {book.genre3 !== "UNSELECTED" && (
                        <SimilarBooks
                          me={me}
                          id={book.id}
                          books={data.books}
                          genre={book.genre3}
                          genreLabel={genreLabels[2]}
                          cardView={this.props.cardView}
                        />
                      )}
                    </>
                  </>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}
export default SingleBook;
