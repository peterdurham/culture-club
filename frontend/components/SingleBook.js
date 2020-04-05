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
import Error from "./ErrorMessage";
import { TiEdit } from "react-icons/ti";
import { BookGenres } from "../config";

const DetailsPageStyles = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  /* box-shadow: ${(props) => props.theme.bs}; */

  display: flex;
  min-height: 800px;
  padding: 0 4rem;
  position:relative;

.singleImageContainer {
  width: 200px;
    height: 300px;
}
  .singleImageContainer img {
    width: 200px;
    height: 300px;
    object-fit: contain;
  }
  .singleButtons {
    display: flex;

  }
  .singleButtons button {
    margin-right: 8px;
  }
  .singleDetails {
    padding: 4px 24px;
  }
  .singleActions {
    position:absolute;
    top: 12px;
    left: 186px;
  }
  .singleTitle {
    font-size: 3.5rem;
    line-height: 4.7rem;
  }
 
  .singleEdit {
    display: inline-block;
    width: 46.55px;
  }
  .description {
    width: 70%;
  }
  .genre {
    font-size: 14.4px;
    color: #000;
    display: inline-block;
    cursor: pointer;
  }
  .genre:hover {
    text-decoration: underline;
  }
  h2,
  h4 {
    margin: 0;
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
      <Query
        query={SINGLE_BOOK_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.book) return <p>No book Found for {this.props.id}</p>;
          const book = data.book;

          const genres = [book.genre1, book.genre2, book.genre3];
          const genreTitles = BookGenres.map((genre) => genre.title);
          const genreValues = BookGenres.map((genre) => genre.value);

          const genreLabels = genres.map((genre, index) => {
            const genreIndex = genreValues.indexOf(genre);
            return genreTitles[genreIndex];
          });
          return (
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
                  <div className="singleYear">({book.year})</div>
                  <div className="singleActions">
                    <Link
                      href={{
                        pathname: "update-book",
                        query: { id: book.id },
                      }}
                    >
                      <a className="button singleEdit">Edit</a>
                    </Link>

                    <DeleteBook id={book.id}>Delete</DeleteBook>
                  </div>
                </div>
                {book.author && (
                  <div>
                    <span className="bold">Author: </span> {book.author}
                  </div>
                )}
                <div className="singleGenres">
                  <span className="bold">Genres: </span>
                  <span>{genreLabels[0]}</span>
                  {book.genre2 !== "UNSELECTED" && (
                    <span>, {genreLabels[1]}</span>
                  )}
                  {book.genre3 !== "UNSELECTED" && (
                    <span>, {genreLabels[2]}</span>
                  )}
                </div>
                {book.printLength && (
                  <div>
                    <span className="bold">printLength: </span>{" "}
                    {book.printLength} pages
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <span className="bold">publisher: </span> {book.publisher}
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
          );
        }}
      </Query>
    );
  }
}
export default SingleBook;
