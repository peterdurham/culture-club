import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { Query } from "react-apollo";
import styled from "styled-components";
import AddToToWatch from "./AddToToWatch";
import RemoveFromToWatch from "./RemoveFromToWatch";
import AddToSeenIt from "./AddToSeenIt";
import RemoveFromSeenIt from "./RemoveFromSeenIt";
import DeleteMovie from "./DeleteMovie";
import Error from "./ErrorMessage";
import { TiEdit } from "react-icons/ti";
import { MovieGenres } from "../config";

const DetailsPageStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};

  display: flex;
  min-height: 800px;
  padding: 0 4rem;
  img {
    width: 300px;
    height: 450px;
    object-fit: contain;
  }
  h2 {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
  .details {
    margin: 1rem 4rem;
    font-size: 1.4rem;

    h3 {
      margin: 0;
    }
  }
  .length {
    display: flex;
  }
  .first-line {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .second-line {
    width: 160px;
    display: flex;
    justify-content: space-between;
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

const SINGLE_MOVIE_QUERY = gql`
  query SINGLE_MOVIE_QUERY($id: ID!) {
    movie(where: { id: $id }) {
      id
      title
      director
      year
      description
      length
      budget
      gross
      imdbURL
      genre1
      genre2
      genre3
      largeImage
    }
  }
`;

class SingleMovie extends Component {
  render() {
    const toWatchIds = this.props.me.toWatch.map((item) => item.movie.id);
    const seenItIds = this.props.me.seenIt.map((item) => item.movie.id);

    return (
      <Query
        query={SINGLE_MOVIE_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.movie) return <p>No movie Found for {this.props.id}</p>;
          const movie = data.movie;

          const genres = [movie.genre1, movie.genre2, movie.genre3];
          const genreTitles = MovieGenres.map((genre) => genre.title);
          const genreValues = MovieGenres.map((genre) => genre.value);

          const genreLabels = genres.map((genre, index) => {
            const genreIndex = genreValues.indexOf(genre);
            return genreTitles[genreIndex];
          });
          return (
            <DetailsPageStyles>
              <Head>
                <title>Culture Club | {movie.title}</title>
              </Head>
              <img src={movie.largeImage} alt={movie.title} />
              <div className="details">
                <div className="first-line">
                  <h2>Viewing {movie.title} </h2>
                  <div>
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
                <div className="second-line">
                  {movie.year && <span clsasName="year">({movie.year})</span>}
                  {movie.length && (
                    <span className="length">{movie.length} minutes</span>
                  )}
                </div>
                <div>
                  <span>{genreLabels[0]}</span>
                  {movie.genre2 !== "UNSELECTED" && (
                    <span>, {genreLabels[1]}</span>
                  )}
                  {movie.genre3 !== "UNSELECTED" && (
                    <span>, {genreLabels[2]}</span>
                  )}
                </div>
                <p className="description">{movie.description}</p>

                {movie.budget && <div>Budget: {movie.budget}</div>}
                {movie.gross && <div>Gross: {movie.gross}</div>}

                <div>
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
            </DetailsPageStyles>
          );
        }}
      </Query>
    );
  }
}
export default SingleMovie;
