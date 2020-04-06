import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "../styles/PriceTag";
import formatMoney from "../../lib/formatMoney";
import DeleteBook from "./DeleteBook";

import DeleteButton from "../DeleteButton";
import AddToCart from "../AddToCart";
import AddToToRead from "./AddToToRead";
import RemoveFromToRead from "./RemoveFromToRead";
import AddToReadIt from "./AddToReadIt";
import RemoveFromReadIt from "./RemoveFromReadIt";
import CardDefault from "../styles/CardDefault";
import CardWide from "../styles/CardWide";
import ListView from "../styles/ListView";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { BookGenres } from "../../config";

const BookCard = ({ book, me, cardView }) => {
  let toReadIds;
  let readItIds;
  if (me) {
    toReadIds = me.toRead.map((item) => item.book.id);
    readItIds = me.readIt.map((item) => item.book.id);
  }
  console.log(toReadIds, "TO READ");
  console.log(readItIds, "READ IT");
  const genres = [book.genre1, book.genre2, book.genre3];
  const genreTitles = BookGenres.map((genre) => genre.title);
  const genreValues = BookGenres.map((genre) => genre.value);

  const genreLabels = genres.map((genre, index) => {
    const genreIndex = genreValues.indexOf(genre);
    return genreTitles[genreIndex];
  });

  if (cardView === "default") {
    return (
      <CardDefault>
        <Link
          href={{
            pathname: "/book",
            query: { id: book.id },
          }}
        >
          <a>{book.image && <img src={book.image} alt="book poster" />}</a>
        </Link>

        <div className="cardDefaultDetails">
          <Link
            href={{
              pathname: "/book",
              query: { id: book.id },
            }}
          >
            <div className="cardDefaultTitle">{book.title}</div>
          </Link>

          <div className="cardDefaultButtons">
            {me && me.id === book.user.id && (
              <Link
                href={{
                  pathname: "update-book",
                  query: { id: book.id },
                }}
              >
                <a className="button">
                  {/* <TiEdit /> */}
                  Edit
                </a>
              </Link>
            )}
          </div>
          {/* <DeleteBook id={book.id}>Delete</DeleteBook> */}

          <div className="flex-apart details">
            <div className="cardDefaultGenres">
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
            <Link
              href={{
                pathname: "/year",
                query: {
                  type: "book",
                  year: book.year,
                },
              }}
            >
              <a className="cardDefaultYear">
                <span>({book.year})</span>
              </a>
            </Link>
          </div>
          {me && (
            <div className="flex-apart cardDefaultListButtons">
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
      </CardDefault>
    );
  } else if (cardView === "wide") {
    return (
      <CardWide>
        {book.image && (
          <img className="cardWideImage" src={book.image} alt={book.title} />
        )}

        <div className="cardWideDetails flex-apart">
          <div className="cardWideDetailsTop">
            <Link
              href={{
                pathname: "/book",
                query: { id: book.id },
              }}
            >
              <a className="cardWideTitle">{book.title}</a>
            </Link>

            <div className="cardWideYear">
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
            {book.author && (
              <div>
                <span className="bold">Author: </span>
                <Link
                  href={{
                    pathname: "/author",
                    query: {
                      type: "book",
                      author: book.author,
                    },
                  }}
                >
                  <a>{book.author}</a>
                </Link>
              </div>
            )}
            {book.genre1 && (
              <div className="cardWideGenres">
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
                    <span className="bold">Genres: </span>
                    {genreLabels[0]}
                  </a>
                </Link>
                {book.genre2 !== "UNSELECTED" && (
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
                      <span>, {genreLabels[1]}</span>
                    </a>
                  </Link>
                )}
                {book.genre3 !== "UNSELECTED" && (
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
                      <span>, {genreLabels[2]}</span>
                    </a>
                  </Link>
                )}
              </div>
            )}
            {book.printLength && (
              <div>
                {" "}
                <span className="bold">Length: </span>
                {book.printLength} pages
              </div>
            )}

            {book.pdfURL && (
              <div>
                {" "}
                <span className="bold">PDF: </span>
                {book.pdfURL}
              </div>
            )}
          </div>
          {me && (
            <div className="cardWideListButtons list-buttons ">
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
          {me && me.id === book.user.id && (
            <div className="cardWideButtonList">
              {me && me.id === book.user.id && (
                <Link
                  href={{
                    pathname: "update-book",
                    query: { id: book.id },
                  }}
                >
                  <a className="edit-link button flex-apart">Edit</a>
                </Link>
              )}
              {/* <DeleteBook id={book.id} className="flex-apart">
                Delete
              </DeleteBook> */}
            </div>
          )}
        </div>
      </CardWide>
    );
  } else if (cardView === "list") {
    return (
      <ListView>
        <Link
          href={{
            pathname: "/book",
            query: { id: book.id },
          }}
        >
          <a className="listViewTitle">{book.title}</a>
        </Link>
        <div className="listViewYear">({book.year})</div>
        <div className="listViewGenres">
          {genreLabels[0]}
          {book.genre2 !== "UNSELECTED" && <span>{genreLabels[1]}</span>}
          {book.genre3 !== "UNSELECTED" && <span>{genreLabels[2]}</span>}
        </div>
        <p className="listViewDescription">{book.description}</p>

        <div className="listViewButtons">
          {me && (
            <div className="flex-apart">
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
          <div className="flex-end">
            <Link
              href={{
                pathname: "update-book",
                query: { id: book.id },
              }}
            >
              <a className="edit-link">
                <TiEdit />
              </a>
            </Link>

            <DeleteBook id={book.id}>Delete This Book</DeleteBook>
          </div>
        </div>
      </ListView>
    );
  }
};
export default BookCard;
