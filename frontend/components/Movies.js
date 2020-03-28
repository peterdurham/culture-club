import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Movie from "./Movie";
import MovieCard from "./MovieCard";
import Pagination from "./PaginationMovies";
import { perPage } from "../config";

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
  grid-gap: 10px;
  max-width: ${props => props.theme.maxWidth};
  margin: 40px auto 100px auto;
`;

class Movies extends Component {
  render() {
    return (
      <Center>
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
                {data.movies.map(movie => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </MoviesList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Movies;
export { ALL_MOVIES_QUERY };
