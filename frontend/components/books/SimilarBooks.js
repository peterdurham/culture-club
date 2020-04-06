import React from "react";
import styled from "styled-components";
import Link from "next/link";

import AddToToRead from "./AddToToRead";
import RemoveFromToRead from "./RemoveFromToRead";
import AddToReadIt from "./AddToReadIt";
import RemoveFromReadIt from "./RemoveFromReadIt";

import shuffleArray from "../../lib/shuffleArray";
import SimilarCardStyles from "../styles/SimilarCard";

const SimilarBooks = ({ me, books, genre, genreLabel, id }) => {
  if (!books) return <div>loading...</div>;

  let toReadIds;
  let readItIds;

  if (me) {
    toReadIds = me.toRead.map((item) => item.book.id);
    readItIds = me.readIt.map((item) => item.book.id);
  }

  const genreBooks = books.filter((book) => {
    const differentBook = book.id !== id;
    const one = book.genre1 === genre;
    const two = book.genre2 === genre;
    const three = book.genre3 === genre;

    return differentBook && (one || two || three);
  });

  const shuffledBooks = shuffleArray(genreBooks);

  if (genreBooks.length === 0) return null;
  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>Other {genreLabel} Books</h2>
      {books && (
        <div className="similarCardContainer">
          {shuffledBooks.map((book, index) => {
            if (index < 5)
              return (
                <SimilarCardStyles>
                  <Link
                    href={{
                      pathname: "/book",
                      query: { id: book.id },
                    }}
                  >
                    <a>
                      {book.image && <img src={book.image} alt="book poster" />}
                    </a>
                  </Link>

                  <div className="similarDetails">
                    <div className="similarTitle">
                      <Link
                        href={{
                          pathname: "/book",
                          query: { id: book.id },
                        }}
                      >
                        {book.title}
                      </Link>
                    </div>
                    {me && (
                      <div className="flex-apart similarButtons">
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
                </SimilarCardStyles>
              );
          })}
        </div>
      )}
    </div>
  );
};
export default SimilarBooks;
