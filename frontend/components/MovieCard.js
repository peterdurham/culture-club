import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteMovie from "./DeleteMovie";

import DeleteButton from "./DeleteButton";
import AddToCart from "./AddToCart";
import AddToToWatch from "./AddToToWatch";
import RemoveFromToWatch from "./RemoveFromToWatch";
import AddToSeenIt from "./AddToSeenIt";
import RemoveFromSeenIt from "./RemoveFromSeenIt";
import CardDefault from "./styles/CardDefault";
import CardWide from "./styles/CardWide";
import ListView from "./styles/ListView";
import { TiEdit } from "react-icons/ti";
import { MovieGenres } from "../config";

const MovieCard = ({ movie, me, view }) => {
  let toWatchIds;
  let seenItIds;

  if (me) {
    toWatchIds = me.toWatch.map((item) => item.movie.id);
    seenItIds = me.seenIt.map((item) => item.movie.id);
  }

  const genres = [movie.genre1, movie.genre2, movie.genre3];
  const genreTitles = MovieGenres.map((genre) => genre.title);
  const genreValues = MovieGenres.map((genre) => genre.value);

  const genreLabels = genres.map((genre, index) => {
    const genreIndex = genreValues.indexOf(genre);
    return genreTitles[genreIndex];
  });

  if (view === "default") {
    return (
      <CardDefault>
        <Link
          href={{
            pathname: "/movie",
            query: { id: movie.id },
          }}
        >
          <a>{movie.image && <img src={movie.image} alt="movie poster" />}</a>
        </Link>

        <div className="movie-details">
          <div className="flex-apart">
            <Link
              href={{
                pathname: "/movie",
                query: { id: movie.id },
              }}
            >
              <span className="title">{movie.title}</span>
            </Link>

            <div className="buttons">
              <Link
                href={{
                  pathname: "update-movie",
                  query: { id: movie.id },
                }}
              >
                <TiEdit />
              </Link>
              <DeleteMovie id={movie.id}>Delete This Movie</DeleteMovie>
            </div>
          </div>

          <div className="flex-apart details">
            <div className="cardDefaultGenres">
              <span>{genreLabels[0]}</span>
              {movie.genre2 !== "UNSELECTED" && <span>, {genreLabels[1]}</span>}
              {movie.genre3 !== "UNSELECTED" && <span>, {genreLabels[2]}</span>}
            </div>
            <span>{movie.year}</span>
          </div>
          {me && (
            <div className="flex-apart list-buttons">
              {toWatchIds.indexOf(movie.id) > -1 ? (
                <RemoveFromToWatch id={movie.id} />
              ) : (
                <AddToToWatch id={movie.id} />
              )}
              {seenItIds.indexOf(movie.id) > -1 ? (
                <RemoveFromSeenIt id={movie.id} />
              ) : (
                <AddToSeenIt id={movie.id} />
              )}
            </div>
          )}
        </div>
      </CardDefault>
    );
  } else if (view === "wide") {
    return (
      <CardWide>
        {movie.image && (
          <img className="cardWideImage" src={movie.image} alt={movie.title} />
        )}

        <div className="cardWideDetails flex-apart">
          <div>
            <Link
              href={{
                pathname: "/movie",
                query: { id: movie.id },
              }}
            >
              <a className="cardWideTitle">{movie.title}</a>
            </Link>
            <div>({movie.year})</div>
            <div className="cardWideGenres">
              {genreLabels[0]}
              {movie.genre2 !== "UNSELECTED" && <span>, {genreLabels[1]}</span>}
              {movie.genre3 !== "UNSELECTED" && <span>, {genreLabels[2]}</span>}
            </div>
            <p>{movie.description}</p>
          </div>
          <div className="list-buttons flex-apart">
            {toWatchIds.indexOf(movie.id) > -1 ? (
              <RemoveFromToWatch id={movie.id} />
            ) : (
              <AddToToWatch id={movie.id} />
            )}

            {seenItIds.indexOf(movie.id) > -1 ? (
              <RemoveFromSeenIt id={movie.id} />
            ) : (
              <AddToSeenIt id={movie.id} />
            )}
          </div>
          <div
            className="buttonList"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href={{
                pathname: "update-movie",
                query: { id: movie.id },
              }}
            >
              <a className="edit-link">
                <TiEdit />
              </a>
            </Link>

            <DeleteMovie id={movie.id}>Delete This Movie</DeleteMovie>
          </div>
        </div>
      </CardWide>
    );
  } else if (view === "list") {
    return (
      <ListView>
        <Link
          href={{
            pathname: "/movie",
            query: { id: movie.id },
          }}
        >
          <a className="listViewTitle">{movie.title}</a>
        </Link>
        <div className="listViewYear">({movie.year})</div>
        <div className="listViewGenres">
          {genreLabels[0]}
          {movie.genre2 !== "UNSELECTED" && <span>{genreLabels[1]}</span>}
          {movie.genre3 !== "UNSELECTED" && <span>{genreLabels[2]}</span>}
        </div>
        <p className="listViewDescription">{movie.description}</p>

        <div className="listViewButtons">
          <div className="flex-apart">
            {toWatchIds.indexOf(movie.id) > -1 ? (
              <RemoveFromToWatch id={movie.id} />
            ) : (
              <AddToToWatch id={movie.id} />
            )}

            {seenItIds.indexOf(movie.id) > -1 ? (
              <RemoveFromSeenIt id={movie.id} />
            ) : (
              <AddToSeenIt id={movie.id} />
            )}
          </div>
          <div className="flex-end">
            <Link
              href={{
                pathname: "update-movie",
                query: { id: movie.id },
              }}
            >
              <a className="edit-link">
                <TiEdit />
              </a>
            </Link>

            <DeleteMovie id={movie.id}>Delete This Movie</DeleteMovie>
          </div>
        </div>
      </ListView>
    );
  }
};
export default MovieCard;
