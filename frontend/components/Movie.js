import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteMovie from "./DeleteMovie";
import AddToCart from "./AddToCart";

const MovieStyles = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 1rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${(props) => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${(props) => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 2rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default class Movie extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
  };

  render() {
    const { movie } = this.props;
    return (
      <MovieStyles>
        {movie.image && <img src={movie.image} alt={movie.title} />}

        <Title>
          <Link
            href={{
              pathname: "/movie",
              query: { id: movie.id },
            }}
          >
            <a>{movie.title}</a>
          </Link>
        </Title>
        <PriceTag>{movie.year}</PriceTag>
        <p>{movie.description}</p>

        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: movie.id },
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <AddToCart id={movie.id} />
          <DeleteMovie id={movie.id}>Delete This Movie</DeleteMovie>
        </div>
      </MovieStyles>
    );
  }
}
