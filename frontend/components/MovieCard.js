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

import { TiEdit } from "react-icons/ti";

const CardTallStyles = styled.div`
  height: 355px;
  width: 190px;

  img {
    width: 100%;
    height: 275px;
    object-fit: cover;
    transition: all 0.3s;
  }
  img:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.67);
  }
  .CardTall__title {
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 700;
    max-width: 15.6rem;
    text-align: left;
    cursor: pointer;
  }
  .CardTall__title:hover {
    text-decoration: underline;
  }
  .CardTall__buttons {
    height: 24px;
    display: flex;
  }
  .CardTall__buttons {
    cursor: pointer;
  }
  .CardTall__details {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    line-height: 2.6rem;
  }
  .CardTall__details span {
    cursor: pointer;
  }
  .CardTall__details span:hover {
    text-decoration: underline;
  }
  .flex-apart {
    display: flex;
    justify-content: space-between;
  }
  svg {
    font-size: 1.92rem;
  }
  button {
    background: #fff;
    border: none;
    padding: 0 0 0 4px;
    cursor: pointer;
  }
`;

const MovieCard = ({ movie, me }) => {
  const toWatchIds = me.toWatch.map(item => item.movie.id);
  const seenItIds = me.seenIt.map(item => item.movie.id);

  return (
    <CardTallStyles>
      <Link
        href={{
          pathname: "/movie",
          query: { id: movie.id }
        }}
      >
        <a>{movie.image && <img src={movie.image} alt="movie poster" />}</a>
      </Link>

      <div className="movie-details">
        <div className="flex-apart">
          <Link
            href={{
              pathname: "/movie",
              query: { id: movie.id }
            }}
          >
            <span className="CardTall__title">{movie.title}</span>
          </Link>

          <div className="CardTall__buttons">
            <Link
              href={{
                pathname: "update-movie",
                query: { id: movie.id }
              }}
            >
              <TiEdit />
            </Link>
            <DeleteMovie id={movie.id}>Delete This Movie</DeleteMovie>
          </div>
        </div>

        <div className="flex-apart CardTall__details">
          <span>genre</span>
          <span>{movie.year}</span>
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
      </div>
    </CardTallStyles>
  );
};
export default MovieCard;
