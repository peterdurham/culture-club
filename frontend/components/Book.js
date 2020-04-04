import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteBook from "./DeleteBook";

import DeleteButton from "./DeleteButton";
import AddToCart from "./AddToCart";
import AddToToRead from "./AddToToRead";
import RemoveFromToRead from "./RemoveFromToRead";
import AddToReadIt from "./AddToReadIt";
import RemoveFromReadIt from "./RemoveFromReadIt";
import CardDefault from "./styles/CardDefault";
import CardWide from "./styles/CardWide";
import ListView from "./styles/ListView";
import { TiEdit } from "react-icons/ti";
import { BookGenres } from "../config";

const BookCard = ({ book, me, view }) => {
  const toReadIds = me.toRead.map((item) => item.book.id);
  const readItIds = me.readIt.map((item) => item.book.id);

  const genres = [book.genre1, book.genre2, book.genre3];
  const genreTitles = BookGenres.map((genre) => genre.title);
  const genreValues = BookGenres.map((genre) => genre.value);

  const genreLabels = genres.map((genre, index) => {
    const genreIndex = genreValues.indexOf(genre);
    return genreTitles[genreIndex];
  });

  if (view === "default") {
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

        <div className="book-details">
          <div className="flex-apart">
            <Link
              href={{
                pathname: "/book",
                query: { id: book.id },
              }}
            >
              <span className="title">{book.title}</span>
            </Link>

            <div className="buttons">
              <Link
                href={{
                  pathname: "update-book",
                  query: { id: book.id },
                }}
              >
                <TiEdit />
              </Link>
              <DeleteBook id={book.id}>Delete This book</DeleteBook>
            </div>
          </div>

          <div className="flex-apart details">
            <div className="cardDefaultGenres">
              <span>{genreLabels[0]}</span>
              {book.genre2 !== "UNSELECTED" && <span>, {genreLabels[1]}</span>}
              {book.genre3 !== "UNSELECTED" && <span>, {genreLabels[2]}</span>}
            </div>
            <span>{book.author}</span>
            <span>{book.year}</span>
          </div>
          <div className="flex-apart list-buttons">
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
        </div>
      </CardDefault>
    );
  } else if (view === "wide") {
    return (
      <CardWide>
        {book.image && (
          <img className="cardWideImage" src={book.image} alt={book.title} />
        )}

        <div className="cardWideDetails flex-apart">
          <div>
            <Link
              href={{
                pathname: "/book",
                query: { id: book.id },
              }}
            >
              <a className="cardWideTitle">{book.title}</a>
            </Link>
            <div>({book.year})</div>
            <div className="cardWideGenres">
              {genreLabels[0]}
              {book.genre2 !== "UNSELECTED" && <span>, {genreLabels[1]}</span>}
              {book.genre3 !== "UNSELECTED" && <span>, {genreLabels[2]}</span>}
            </div>
            <p>{book.description}</p>
          </div>
          <div className="list-buttons flex-apart">
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
          <div
            className="buttonList"
            style={{ display: "flex", justifyContent: "center" }}
          >
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

            <DeleteBook id={book.id}>Delete This book</DeleteBook>
          </div>
        </div>
      </CardWide>
    );
  } else if (view === "list") {
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
