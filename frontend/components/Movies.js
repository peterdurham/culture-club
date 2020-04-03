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
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const MoviesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 40px;
  max-width: ${props => props.theme.maxWidth};
  margin: 40px auto 100px auto;
`;

class Movies extends Component {
  render() {
    const filters = ["all", "toWatch", "seenIt", "genre", "year"];
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Center>
              <SearchMovies />
              <Pagination page={this.props.page} />
              <Query
                query={ALL_MOVIES_QUERY}
                // fetchPolicy="network-only"
                variables={{
                  skip: this.props.page * perPage - perPage,
                  first: perPage
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error: {error.message}</p>;

                  return (
                    <MoviesList>
                      {this.props.filter === "all" && (
                        <>
                          {data.movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id} me={me} />
                          ))}
                        </>
                      )}
                      {this.props.filter === "toWatch" && (
                        <>
                          {data.movies
                            .filter(movie => {
                              const toWatchIds = me.toWatch.map(
                                item => item.movie.id
                              );

                              return toWatchIds.indexOf(movie.id) > -1;
                            })
                            .map(movie => (
                              <MovieCard movie={movie} key={movie.id} me={me} />
                            ))}
                        </>
                      )}
                      {this.props.filter === "seenIt" && (
                        <>
                          {data.movies
                            .filter(movie => {
                              const seenItIds = me.seenIt.map(
                                item => item.movie.id
                              );

                              return seenItIds.indexOf(movie.id) > -1;
                            })
                            .map(movie => (
                              <MovieCard movie={movie} key={movie.id} me={me} />
                            ))}
                        </>
                      )}
                      {/* {this.props.filter === "genre" && (
                        <>
                        {data.movies
                          .filter(movie => {
                            const seenItIds = me.seenIt.map(
                              item => item.movie.id
                            );

                            return seenItIds.indexOf(movie.id) > -1;
                          })
                          .map(movie => (
                            <MovieCard movie={movie} key={movie.id} me={me} />
                          ))}
                      </>
                      )}
                      {this.props.filter === "year" && (
                        <>
                          {data.movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id} me={me} />
                          ))}
                        </>
                      )} */}
                    </MoviesList>
                  );
                }}
              </Query>
              <Pagination page={this.props.page} />
            </Center>
          );
        }}
      </User>
    );
  }
}

export default Movies;
export { ALL_MOVIES_QUERY };
