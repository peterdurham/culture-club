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
import Error from "../ErrorMessage";
import { TiEdit } from "react-icons/ti";
import { perPage, MovieGenres } from "../../config";
import formatMoney from "../../lib/formatMoney";
import DetailsPageStyles from "../styles/DetailsPage";
import SimilarMovies from "./SimilarMovies";
import User from "../User";

const ALL_MOVIES_QUERY = gql`
  query ALL_MOVIES_QUERY($skip: Int = 0) {
    movies(skip: $skip, orderBy: title_DESC) {
      id
      title
      year
      director
      description
      genre1
      genre2
      genre3
      length
      image
      largeImage
      user {
        id
      }
    }
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
      toWatchIds = me.toWatch.map((item) => item.movie.id);
      seenItIds = me.seenIt.map((item) => item.movie.id);
    }

    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Query query={ALL_MOVIES_QUERY}>
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                if (!data.movies)
                  return <p>No movie Found for {this.props.id}</p>;

                const movie = data.movies.filter(
                  (movie) => movie.id === this.props.id
                )[0];

                const genres = [movie.genre1, movie.genre2, movie.genre3];
                const genreTitles = MovieGenres.map((genre) => genre.title);
                const genreValues = MovieGenres.map((genre) => genre.value);

                const genreLabels = genres.map((genre, index) => {
                  const genreIndex = genreValues.indexOf(genre);
                  return genreTitles[genreIndex];
                });
                return (
                  <>
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
                          <div className="singleYear">
                            <Link
                              href={{
                                pathname: "/year",
                                query: {
                                  type: "movie",
                                  year: movie.year,
                                },
                              }}
                            >
                              <a>({movie.year})</a>
                            </Link>
                          </div>
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
                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "movie",
                                genre: movie.genre1.toLowerCase(),
                              },
                            }}
                          >
                            <a>
                              <span>{genreLabels[0]}</span>
                            </a>
                          </Link>

                          {movie.genre2 !== "UNSELECTED" && (
                            <Link
                              href={{
                                pathname: "/genre",
                                query: {
                                  type: "movie",
                                  genre: movie.genre2.toLowerCase(),
                                },
                              }}
                            >
                              <a>
                                <span>, {genreLabels[1]}</span>
                              </a>
                            </Link>
                          )}

                          {movie.genre3 !== "UNSELECTED" && (
                            <Link
                              href={{
                                pathname: "/genre",
                                query: {
                                  type: "movie",
                                  genre: movie.genre3.toLowerCase(),
                                },
                              }}
                            >
                              <a>
                                <span>, {genreLabels[2]}</span>
                              </a>
                            </Link>
                          )}
                        </div>
                        {movie.director && (
                          <div>
                            <Link
                              href={{
                                pathname: "/director",
                                query: {
                                  type: "movie",
                                  director: movie.director,
                                },
                              }}
                            >
                              <a>
                                <span className="bold">Director: </span>{" "}
                                {movie.director}
                              </a>
                            </Link>
                          </div>
                        )}
                        <div className="singleLength">
                          {movie.length && (
                            <div>
                              <span className="bold">Length: </span>
                              <span className="length">
                                {movie.length} minutes
                              </span>
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
                    <>
                      <SimilarMovies
                        me={me}
                        movies={data.movies}
                        id={movie.id}
                        genre={movie.genre1}
                        genreLabel={genreLabels[0]}
                        cardView={this.props.cardView}
                      />
                      {movie.genre2 !== "UNSELECTED" && (
                        <SimilarMovies
                          me={me}
                          movies={data.movies}
                          id={movie.id}
                          genre={movie.genre2}
                          genreLabel={genreLabels[1]}
                          cardView={this.props.cardView}
                        />
                      )}
                      {movie.genre3 !== "UNSELECTED" && (
                        <SimilarMovies
                          me={me}
                          movies={data.movies}
                          id={movie.id}
                          genre={movie.genre3}
                          genreLabel={genreLabels[2]}
                          cardView={this.props.cardView}
                        />
                      )}
                    </>
                  </>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}
export default SingleMovie;
