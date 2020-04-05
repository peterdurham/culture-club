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
import formatMoney from "../lib/formatMoney";

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
    const { me } = this.props;
    let toWatchIds;
    let seenItIds;
    if (me) {
      toWatchIds = this.props.me.toWatch.map((item) => item.movie.id);
      seenItIds = this.props.me.seenIt.map((item) => item.movie.id);
    }
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
              <div className="singleImageContainer">
                <img
                  src={movie.largeImage}
                  alt={movie.title}
                  className="singleImage"
                />
                {me && (
                  <div className="singleButtons">
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
              <div className="singleDetails">
                <div>
                  <h2 className="singleTitle">{movie.title} </h2>
                  <div className="singleYear">({movie.year})</div>
                  <div className="singleActions">
                    <Link
                      href={{
                        pathname: "update-movie",
                        query: { id: movie.id },
                      }}
                    >
                      <a className="button singleEdit">Edit</a>
                    </Link>

                    <DeleteMovie id={movie.id}>Delete</DeleteMovie>
                  </div>
                </div>

                <div className="singleGenres">
                  <span className="bold">Genres: </span>
                  <span>{genreLabels[0]}</span>
                  {movie.genre2 !== "UNSELECTED" && (
                    <span>, {genreLabels[1]}</span>
                  )}
                  {movie.genre3 !== "UNSELECTED" && (
                    <span>, {genreLabels[2]}</span>
                  )}
                </div>
                {movie.director && (
                  <div>
                    <span className="bold">Director: </span> {movie.director}
                  </div>
                )}
                <div className="singleLength">
                  {movie.length && (
                    <div>
                      <span className="bold">Length: </span>
                      <span className="length">{movie.length} minutes</span>
                    </div>
                  )}
                </div>
                <div className="singleDescription">
                  <span className="bold">Description: </span>
                  {movie.description}
                </div>

                {movie.imdbURL && (
                  <div>
                    <span className="bold">IMDB Link: </span>
                    {movie.imdbURL}
                  </div>
                )}

                {movie.budget && (
                  <div>
                    <span className="bold">Budget: </span>
                    {formatMoney(movie.budget)}
                  </div>
                )}
                {movie.gross && (
                  <div>
                    <span className="bold">Gross: </span>
                    {formatMoney(movie.gross)}
                  </div>
                )}
              </div>
            </DetailsPageStyles>
          );
        }}
      </Query>
    );
  }
}
export default SingleMovie;
