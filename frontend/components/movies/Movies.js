import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Movie from "./Movie";
import MovieCard from "./MovieCard";
import Pagination from "./PaginationMovies";
import { perPage } from "../../config";
import SearchMovies from "./SearchMovies";
import User from "../User";

const ALL_MOVIES_QUERY = gql`
  query ALL_MOVIES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    movies(first: $first, skip: $skip, orderBy: title_DESC) {
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

const Center = styled.div`
  text-align: center;
`;

const MoviesList = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 40px; */

  display: flex;
  flex-wrap: wrap;
  max-width: ${(props) => props.theme.maxWidth};
`;

const Movies = (props) => {
  const filters = ["all", "toWatch", "seenIt", "genre", "year"];
  // const view = ["default", "wide", "list"];

  // const view = "wide";

  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Center>
            {props.genre && (
              <h1 className="page-header">{props.genreLabel} Movies</h1>
            )}
            {props.year && (
              <h1 className="page-header">Movies from {props.year}</h1>
            )}
            {props.director && (
              <h1 className="page-header">
                Movies directed by {props.director}
              </h1>
            )}
            <SearchMovies />
            <div className="cardStyleButtons">
              <button
                className="button"
                onClick={() => props.setCardView("default")}
              >
                Default View
              </button>
              <button
                className="button"
                onClick={() => props.setCardView("wide")}
              >
                Wide View
              </button>
              {/* <button className="button" onClick={() => setView("list")}>
                List
              </button> */}
            </div>
            <Pagination page={props.page} />
            <Query
              query={ALL_MOVIES_QUERY}
              // fetchPolicy="network-only"
              variables={{
                skip: props.page * perPage - perPage,
                first: perPage,
              }}
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return (
                  <MoviesList>
                    {props.filter === "all" && (
                      <>
                        {data.movies.map((movie) => {
                          return (
                            <MovieCard
                              movie={movie}
                              key={movie.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          );
                        })}
                      </>
                    )}
                    {props.filter === "toWatch" && (
                      <>
                        {data.movies
                          .filter((movie) => {
                            const toWatchIds = me.toWatch.map(
                              (item) => item.movie.id
                            );

                            return toWatchIds.indexOf(movie.id) > -1;
                          })
                          .map((movie) => (
                            <MovieCard
                              movie={movie}
                              key={movie.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "seenIt" && (
                      <>
                        {data.movies
                          .filter((movie) => {
                            const seenItIds = me.seenIt.map(
                              (item) => item.movie.id
                            );

                            return seenItIds.indexOf(movie.id) > -1;
                          })
                          .map((movie) => (
                            <MovieCard
                              movie={movie}
                              movies={array}
                              key={movie.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "genre" && (
                      <>
                        {data.movies
                          .filter((movie) => {
                            const first = movie.genre1 === props.genre;
                            const second = movie.genre2 === props.genre;
                            const third = movie.genre3 === props.genre;
                            return first || second || third;
                          })
                          .map((movie) => (
                            <MovieCard
                              movie={movie}
                              key={movie.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "year" && (
                      <>
                        {data.movies
                          .filter((movie) => {
                            return movie.year === Number(props.year);
                          })
                          .map((movie) => (
                            <MovieCard
                              movie={movie}
                              key={movie.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "director" && (
                      <>
                        {data.movies
                          .filter((movie) => {
                            return movie.director === props.director;
                          })
                          .map((movie, index, array) => (
                            <MovieCard
                              movie={movie}
                              key={movie.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                  </MoviesList>
                );
              }}
            </Query>
            <Pagination page={props.page} />
          </Center>
        );
      }}
    </User>
  );
};

export default Movies;
export { ALL_MOVIES_QUERY };
