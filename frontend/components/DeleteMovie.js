import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_MOVIES_QUERY } from "./Movies";

const DELETE_MOVIE_MUTATION = gql`
  mutation DELETE_MOVIE_MUTATION($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

class DeleteMovie extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_MOVIES_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted item out of the page
    data.movies = data.movies.filter(
      movie => movie.id !== payload.data.deleteMovie.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_MOVIES_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_MOVIE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteMovie, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this Movie?")) {
                deleteMovie().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteMovie;
