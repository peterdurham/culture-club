import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteMovie from "./DeleteMovie";
import AddToCart from "./AddToCart";

const CardStyles = styled.div`
  height: 385px;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(222, 222, 222);
  h2 {
    font-size: 16px;
    margin: 0;
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;
const MovieDetails = styled.a`
  text-align: left;
  padding: 12px;
  h2 {
    font-size: 14px;
    line-height: 22.4px;
    font-weight: 400;
    margin: 0 10px;
    cursor: pointer;
  }
  h3 {
    font-size: 14.4px;
    line-height: 24.68px;
    font-weight: 400;
    margin: 0 10px;
  }
`;

const MovieCard = ({ movie }) => {
  console.log(movie);
  return (
    <CardStyles>
      <Link
        href={{
          pathname: "/movie",
          query: { id: movie.id }
        }}
      >
        <a>{movie.image && <img src={movie.image} alt="movie poster" />}</a>
      </Link>

      <MovieDetails>
        <Link
          href={{
            pathname: "/movie",
            query: { id: movie.id }
          }}
        >
          <h2>{movie.title}</h2>
        </Link>

        <h3>{movie.year}</h3>
      </MovieDetails>
    </CardStyles>
  );
};
export default MovieCard;
