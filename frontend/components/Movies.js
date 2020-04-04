import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Movie from "./Movie";
import MovieCard from "./MovieCard";
import Pagination from "./PaginationMovies";
import { perPage } from "../config";
import SearchMovies from "./SearchMovies";
import User from "./User";

const ALL_MOVIES_QUERY = gql`
  query ALL_MOVIES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    movies(first: $first, skip: $skip, orderBy: title_DESC) {
      id
      title
      year
      description
      genre1
      genre2
      genre3
      image
      largeImage
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
  margin: 40px auto 100px auto;
`;

const Movies = (props) => {
  const filters = ["all", "toWatch", "seenIt", "genre", "year"];
  // const view = ["default", "wide", "list"];
  const [view, setView] = React.useState("default");
  // const view = "wide";
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Center>
            <SearchMovies />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button className="button" onClick={() => setView("default")}>
                Default
              </button>
              <button className="button" onClick={() => setView("wide")}>
                Wide
              </button>
              <button className="button" onClick={() => setView("list")}>
                List
              </button>
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
                        {data.movies.map((movie) => (
                          <MovieCard
                            movie={movie}
                            key={movie.id}
                            me={me}
                            view={view}
                          />
                        ))}
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
                              view={view}
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
                              key={movie.id}
                              me={me}
                              view={view}
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
