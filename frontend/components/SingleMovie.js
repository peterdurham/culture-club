import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { Query } from "react-apollo";
import styled from "styled-components";

import Error from "./ErrorMessage";

const SingleMovieStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};

  display: flex;
  min-height: 800px;
  padding: 0 4rem;
  img {
    width: 210px;
    height: 315px;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 1.4rem;
  }
  h2,
  h4 {
    margin: 0;
  }
`;
const MovieDetails = styled.div`
  padding: 24px;
  .movie__rating {
    padding: 24px 0;
  }
  h3 {
    margin: 0;
  }
`;
const Rating = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  padding: 4px;
  color: #000;
  display: inline-block;
`;

const GenreButton = styled.div`
  font-size: 14.4px;
  color: #000;
  border: 2px solid #d7d7d7;
  display: inline-block;
  padding: 0 7px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 4px;
`;

const SINGLE_MOVIE_QUERY = gql`
  query SINGLE_MOVIE_QUERY($id: ID!) {
    movie(where: { id: $id }) {
      id
      title
      year
      description
      largeImage
    }
  }
`;

class SingleMovie extends Component {
  render() {
    console.log(this.props.id);
    return (
      <Query
        query={SINGLE_MOVIE_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.movie) return <p>No movie Found for {this.props.id}</p>;
          const movie = data.movie;
          return (
            <SingleMovieStyles>
              <Head>
                <title>Culture Club | {movie.title}</title>
              </Head>
              <img src={movie.largeImage} alt={movie.title} />
              <MovieDetails>
                <h2>
                  Viewing {movie.title} <span>({movie.year})</span>{" "}
                </h2>
                <Link
                  href={{
                    pathname: "update",
                    query: { id: movie.id }
                  }}
                >
                  <a>Edit ✏️</a>
                </Link>
                <div className="movie__rating">
                  <Rating>4.5</Rating> releaseDate/country? -
                  <GenreButton>genre</GenreButton>,
                  <GenreButton>genre 2</GenreButton>,
                  <GenreButton>genre 3</GenreButton>, ... - duration
                </div>
                <div>Movie Rating & Buttons</div>
                <h3>Overview</h3>
                <div>{movie.description}</div>
                <div>director: someone</div>
              </MovieDetails>
            </SingleMovieStyles>
          );
        }}
      </Query>
    );
  }
}
export default SingleMovie;
